import requests
from acadtutor.azure import upload
from django.shortcuts import render
from acadtutor.utils import get_collection_handle,get_db_handle
from acadtutor.azure import ALLOWED_EXTENTIONS,upload
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from datetime import datetime
from rest_framework.decorators import permission_classes,api_view,parser_classes
from rest_framework.parsers import MultiPartParser,FormParser,FileUploadParser
from rest_framework.response import Response
from accounts.models import HOD,Teacher,CustomUser
from bson.objectid import ObjectId
from bson.json_util import dumps,loads
from pathlib import Path
from rest_framework import status

db_handle, mongo_client = get_db_handle()

subj_collection_handle = get_collection_handle(db_handle, "subjects")
unit_collection_handle = get_collection_handle(db_handle, "units")
branch_collection_handle = get_collection_handle(db_handle, "branches")
subtopic_collection_handle = get_collection_handle(db_handle, "subtopics")
assignment_collections_handle = get_collection_handle(db_handle,"assignments")
class_comment_collection_handle = get_collection_handle(db_handle,"classComment")
# uncomment to create branches
# def createbranch():
#     dict=[{
#         "branch":"CS",
#         "semester":[{"id":1,"subjects":[]},{"id":2,"subjects":[]},{"id":3,"subjects":[]},{"id":4,"subjects":[]},{"id":5,"subjects":[]},{"id":6,"subjects":[]},{"id":7,"subjects":[]},{"id":8,"subjects":[]}],
#     },{"branch":"CE",
#         "semester":[{"id":1,"subjects":[]},{"id":2,"subjects":[]},{"id":3,"subjects":[]},{"id":4,"subjects":[]},{"id":5,"subjects":[]},{"id":6,"subjects":[]},{"id":7,"subjects":[]},{"id":8,"subjects":[]}],
#     },{"branch":"ME",
#         "semester":[{"id":1,"subjects":[]},{"id":2,"subjects":[]},{"id":3,"subjects":[]},{"id":4,"subjects":[]},{"id":5,"subjects":[]},{"id":6,"subjects":[]},{"id":7,"subjects":[]},{"id":8,"subjects":[]}],
#     },{"branch":"ET",
#         "semester":[{"id":1,"subjects":[]},{"id":2,"subjects":[]},{"id":3,"subjects":[]},{"id":4,"subjects":[]},{"id":5,"subjects":[]},{"id":6,"subjects":[]},{"id":7,"subjects":[]},{"id":8,"subjects":[]}],
#     },{"branch":"EE",
#         "semester":[{"id":1,"subjects":[]},{"id":2,"subjects":[]},{"id":3,"subjects":[]},{"id":4,"subjects":[]},{"id":5,"subjects":[]},{"id":6,"subjects":[]},{"id":7,"subjects":[]},{"id":8,"subjects":[]}],
#     }]
#     branch_collection_handle.insert_many(dict)
# createbranch()
@csrf_protect
@api_view(('POST',))
@parser_classes([MultiPartParser,FormParser])
def createSubj(request):
    if (request.method == 'POST'):
        data = request.data
        user = request.user
        print(data)
        try:
            isAuth = user.is_authenticated
            if isAuth:
                is_teach = CustomUser.objects.get(email=request.user.email).is_teach
                if is_teach:
                    teacher = Teacher.objects.get(user=user)
                    hod = teacher.hod
                    if hod is None:
                        branch = ""
                    else:
                        branch = hod.branch
                    syllabus_file = request.FILES['s_file']
                    book_file = request.FILES['b_file']
                    img_file= request.FILES['img_file']
                    s_upload_link = upload(syllabus_file)
                    b_upload_link = upload(book_file)
                    img_link = upload(img_file)
                    ext = Path(syllabus_file.name).suffix
                    img_ext  = Path(img_file.name).suffix
                    print(data)
                    if not s_upload_link :
                        return Response({'error':f"{ext} not allowed only accept {', '.join(ext for ext in ['.pdf','.doc','.docx'])} "})
                    if not img_link :
                        return Response({'error':f"{img_ext} not allowed only accept {', '.join(ext for ext in ['.jpg','.jpeg','.png'])} "})
                    dict = {
                        "c_name":data['subj_name'],
                        "sem": data['sem'],
                        "summary": data['summary'],
                        "branch": branch,
                        "units":[],
                        "start_date":data['date'],
                        "author_email":user.email,
                        "author_name":user.name,
                        "syllabus_link":s_upload_link,
                        "book_link":b_upload_link,
                        "img_link" : img_link,
                    }
                    sub = subj_collection_handle.insert_one(dict)
                    branch = branch_collection_handle.find_one_and_update(
                        {
                            "branch": branch,"semester.id":int(data['sem'])
                        },
                    {'$push': {'semester.$.subjects': 
                    {"sub_name":data['subj_name'],
                        "sub_id":str(sub.inserted_id),
                        "summary": data['summary'],
                        "author_email":user.email,
                        "img_link" : img_link,
                        }
                    
                    }}
                    )
                    return Response({'success':f"add subj successfully,subject id:{sub.inserted_id}"})
                else:
                    return Response({'success':"you are not authorized to access"})

            else:
                return Response({'error':'You are not authenticated, please login first'})
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when checking authentication status' })
            return Response({ 'error': str(e) })

@csrf_protect
@api_view(('POST',))
def addUnit(request):
    if (request.method == 'POST'):
        data = request.data
        user = request.user
        try:
            isAuth = user.is_authenticated
            if isAuth:
                is_teach = CustomUser.objects.get(email=request.user.email).is_teach
                obj = subj_collection_handle.find_one({"_id": ObjectId(data['subj_id'])})
                if is_teach and (obj['author_email']==user.email):
                   
                    unitdict = {
                        "u_name":data['u_name'],
                        "subtopics":[],
                        "subj_id": data['subj_id']
                    }
                    unit = unit_collection_handle.insert_one(unitdict)
                    subj_collection_handle.find_one_and_update(
                        {
                            "_id": ObjectId(data['subj_id'])
                        },
                        {'$push': {'units': {"unit_id":str(unit.inserted_id),"u_name":data['u_name']}}}
                    )
                    return Response({'success':f"add unit successfully,unit id:{unit.inserted_id}"})
                else:
                    return Response({'error':"you are not authorized to access"})

            else:
                return Response({'error':'You are not authenticated, please login first'})
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when checking authentication status' })
            return Response({ 'error': str(e) })

@csrf_protect
@api_view(('POST',))
@parser_classes([MultiPartParser,FormParser])
def addSubTopic(request):
    if (request.method == 'POST'):
        data = request.data
        user = request.user
        print(data)
        try:
            isAuth = user.is_authenticated
            if isAuth:
                is_teach = CustomUser.objects.get(email=request.user.email).is_teach
                obj = subj_collection_handle.find_one({"units.unit_id": str(data['unit_id'])})
                if is_teach and (obj['author_email']==user.email):
                    file = request.FILES['file']
                    ext = Path(file.name).suffix
                    upload_link = upload(file)
                    if not upload_link:
                        return Response({'error':f"{ext} not allowed only accept {', '.join(ext for ext in ALLOWED_EXTENTIONS)} "})
                    topic_dict = {
                        "subtopic_name" : data['subtopic_name'],
                        "video_link":[data['v_link']],
                        "link":[data['link']],
                        "notes" : data['notes'],
                        "upload_type":ext,
                        "upload_link":upload_link
                    }
                    subtopic = subtopic_collection_handle.insert_one(topic_dict)
                    unit_collection_handle.find_one_and_update(
                        {
                            "_id": ObjectId(data['unit_id'])
                        },
                        {'$push': {'subtopics':{ 'subtopic_name': data['subtopic_name'],'subtopic_id':str(subtopic.inserted_id)}}}
                    )
                    return Response({'success':f"add subtopic successfully"})
                else:
                    return Response({'error':"you are not authorized to access"})

            else:
                return Response({'error':'You are not authenticated, please login first'})
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when checking authentication status' })
            return Response({ 'error': str(e) })

@csrf_protect
@api_view(('GET',))
def getUnit(request,unit_id):
    if (request.method == 'GET'):
        
        try:
            obj = unit_collection_handle.find_one(
                {"_id": ObjectId(unit_id)},{"_id": 0 }
                )
            if obj is not None:
                return Response(obj)
            else:
                return Response({'error':"Invalid request"})
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when checking authentication status' })
            return Response({ 'error': str(e) })
@csrf_protect
@api_view(('GET',))
def getBranch(request,branch):
    if (request.method == 'GET'):
            obj = branch_collection_handle.find_one({"branch": branch},{"_id": 0 })
            data = obj                     
            if obj is not None:
                return Response(data)
            else:
                return Response({'error':"Invalid request"})

@csrf_protect
@api_view(('GET',))
def getSubj(request,subj_id):
    if (request.method == 'GET'):
            obj = subj_collection_handle.find_one({"_id": ObjectId(subj_id)},{"_id": 0 })
            data = obj
            if obj is not None:
                return Response(data)
            else:
                return Response({'error':"Invalid request"})

@csrf_protect
@api_view(('GET',))
def getSubtopic(request,subtopic_id):
    if (request.method == 'GET'):
            obj = subtopic_collection_handle.find_one({"_id": ObjectId(subtopic_id)},{"_id": 0 })
            data = obj
            if obj is not None:
                return Response(data)
            else:
                return Response({'error':"Invalid request"})

@csrf_protect
@api_view(('GET',))
def getMyCourses(request):
    user = request.user
    try:
        if user.is_authenticated:
            if user.is_teach:
                if (request.method == 'GET'):
                    obj = subj_collection_handle.find({"author_email": request.user.email},{
                "_id": { "$toString": "$_id" },
                "c_name": 1,
                "sem": 1,
                "branch": 1,
                "author_email": 1,
                "author_name": 1,
                "img_link": 1
                })
                data = obj
                if obj is not None:
                    return Response(list(data))
            else:
                return Response({'error':"Invalid request"})
        else:
            return Response({ 'message': 'Not Authenticated' },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })


@csrf_protect
@api_view(('POST',))
@parser_classes([MultiPartParser,FormParser])
def addAssignment(request):
    if (request.method == 'POST'):
        data = request.data
        user = request.user
        try:
            isAuth = user.is_authenticated
            if isAuth:
                is_teach = CustomUser.objects.get(email=request.user.email).is_teach
                if is_teach:
                    file = request.FILES['file']
                    f_upload_link = upload(file)
                    ext = Path(file.name).suffix
                    if not f_upload_link :
                        return Response({'error':f"{ext} not allowed only accept {', '.join(ext for ext in ['.pdf','.doc','.docx'])} "})
                    dict = {
                        "assignment_name":data['name'],
                        "instructions": data['instructions'],
                        "marks":data['marks'],
                        "subject_id": data["subj_id"],
                        "subject_name":data["subj_name"],
                        "due_date":data['date'],
                        "created_at": datetime.today().strftime('%Y-%m-%d'),
                        "author_email":user.email,
                        "author_name":user.name,
                    }
                    assgn = assignment_collections_handle.insert_one(dict)
                    dict = {
                        "assignment_name":data['name'],
                        "marks":data['marks'],
                        "subject_id": data["subj_id"],
                        "due_date":data['date'],
                        "created_at": datetime.today().strftime('%Y-%m-%d'),
                        "author_email":user.email,
                        "author_name":user.name,
                        "file_link":f_upload_link,
                        "video_link":data['v_link'],
                        "link":data['link']
                    }
                    # subj_collection_handle.find_one_and_update(
                    #     {
                    #         "_id": ObjectId(data['subj_id'])
                    #     },
                    #     {'$push': {'units': {"unit_id":str(unit.inserted_id),"u_name":data['u_name']}}}
                    # )
                    return Response({'success':f"add assignment successfully,assignment id:{assgn.inserted_id}"})
                else:
                    return Response({'success':"you are not authorized to access"})
            else:
                return Response({'error':'You are not authenticated, please login first'})
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when checking authentication status' })
            return Response({ 'error': str(e) })


@csrf_protect
@api_view(('GET',))
def getTeacherAssignment(request):
    user = request.user
    try:
        if user.is_authenticated:
            if user.is_teach:
                if (request.method == 'GET'):
                    obj = assignment_collections_handle.find({"author_email": request.user.email},{
                "_id": { "$toString": "$_id" },
                "assignment_name": 1,
                "instructions": 1,
                "marks": 1,
                "subject_id":1,
                "subject_name":1,
                "due_date":1,
                "created_at":1,
                "author_email": 1,
                "author_name": 1,
                "img_link": 1
                })
                data = obj
                print(data)
                if obj is not None:
                    return Response(list(data))
            else:
                return Response({'error':"Invalid request"})
        else:
            return Response({ 'message': 'Not Authenticated' },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })