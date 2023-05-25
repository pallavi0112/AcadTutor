from rest_framework.decorators import permission_classes,api_view
from rest_framework import permissions
from acadtutor.azure import upload
from . models import CustomUser,Teacher,HOD,Student
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import authenticate,login,logout
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser,FormParser
from acadtutor.utils import get_collection_handle,get_db_handle
db_handle, mongo_client = get_db_handle()
subj_collection_handle = get_collection_handle(db_handle, "subjects")



@ensure_csrf_cookie
@permission_classes([permissions.AllowAny])
@api_view(('GET',))
def home(request):
    return HttpResponse("hello there")

@ensure_csrf_cookie
@permission_classes([permissions.AllowAny])
@api_view(('GET',))
def get_CSRF_token(request):
    return Response({ 'message': 'CSRF cookie set' })

@permission_classes([permissions.AllowAny])
@csrf_protect
@api_view(('POST',))
def student_register(request):
    if (request.method == 'POST'):
        data = request.data
        name = data['name']
        print(request)
        email = data['email']
        password = data['password']
        re_password = data['re_password']
        branch = data['branch']
        sem = data['semester']
        try:
            if password == re_password:
                if CustomUser.objects.filter(email=email).exists():
                    return Response({ 'message': 'Email already exists' },status=status.HTTP_409_CONFLICT)
                else:
                    user = CustomUser.objects.create_user(
                        email=email,name=name
                    )
                    user.set_password(password)
                    user.is_student = True
                    user.is_active = True
                    stud = Student(user=user,branch=branch,sem=sem)
                    stud.save()
                    user.save()
                    return Response({ 'message': 'User created successfully' })
            else:
                    return Response({ 'message': 'Passwords do not match' },status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when registering account' })
            return Response({ 'message': str(e) })


@permission_classes([permissions.AllowAny])
@csrf_protect
@api_view(('POST',))
def teacher_register(request):
    if (request.method == 'POST'):
        data = request.data
        name = data['name']
        email = data['email']
        password = data['password']
        re_password = data['re_password']
        ref = data['refc']

        try:
            if password == re_password:
                if CustomUser.objects.filter(email=email).exists():
                    return Response({ 'message': 'Email already exists' },status=status.HTTP_409_CONFLICT)
                else:
                    if HOD.objects.filter(refid=ref).exists():
                        user = CustomUser.objects.create_user(
                            email=email,name=name
                        )
                        user.set_password(password)
                        user.is_teach = True
                        user.is_active = True
                        user.save()
                        Hod = HOD.objects.get(refid=ref)
                        teacher = Teacher(hod=Hod,user=user,branch = Hod.branch)
                        teacher.save()
                        return Response({ 'message': 'User created successfully' })
                    else:
                        return Response({ 'message': 'Referal Code not valid' },status=status.HTTP_400_BAD_REQUEST)
            else:
                    return Response({ 'message': 'Passwords do not match' },status=status.HTTP_401_UNAUTHORIZED)

            
        except Exception as e:
            # return Response({ 'error': 'Something went wrong when registering account' })
            return Response({ 'message': str(e) })

@permission_classes([permissions.AllowAny])
@csrf_protect
@api_view(('GET',))
def IsAuthenticated(request):
    user = request.user
    try:
        isAuth = user.is_authenticated
        if isAuth:
            return Response({ 'isAuthenticated': 'success' })
        else:
            return Response({ 'isAuthenticated': 'error' })
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })
    
@permission_classes([permissions.IsAuthenticated])
@csrf_protect
@api_view(('POST',))
def changePassword(request):
    user = request.user
    data = request.data
    try:
        isAuth = user.is_authenticated
        if isAuth:
            password = data['password']
            confirm_password = data['confirm_password']
            if password != confirm_password:
                return Response({ 'message': 'Passwords do not match' },status=status.HTTP_401_UNAUTHORIZED)
            usr = CustomUser.objects.filter(email=request.user.email)
            if usr.count():
                usr = usr[0]
                usr.set_password(password)
                usr.save()
                print(usr)
            return Response({ 'message': 'successfully password changed' })
        else:
            return Response({ 'message': 'Not Authenticated' },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })

@permission_classes([permissions.IsAuthenticated,MultiPartParser,FormParser])
@csrf_protect
@api_view(('POST',))
def uploadPP(request):
    user = request.user
    try:
        isAuth = user.is_authenticated
        if isAuth:
            file_link = upload(request.FILES['file'])
            usr = CustomUser.objects.filter(email=request.user.email)
            if usr.count():
                usr = usr[0]
                usr.img = file_link
                usr.save()
                print(usr.img)
            return Response({ 'message': 'successfully uploaded profile pic' })
        else:
            return Response({ 'message': 'Not Authenticated' },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })

@permission_classes([permissions.IsAuthenticated])
@csrf_protect
@api_view(('POST',))
def updateProfile(request):
    user = request.user
    data = request.data
    try:
        isAuth = user.is_authenticated
        if isAuth:
            if user.is_teach:
                name = data['name']
                branch = data['branch']
                desig = data['designation']
                about = data['about']
                linkedin = data['linkedin']
                youtube = data['youtube']
                usr = CustomUser.objects.filter(email=request.user.email)
                if usr.count():
                    usr = usr[0]
                    teacher = Teacher.objects.filter(user = usr)
                    if teacher.count():
                        teacher = teacher[0]
                        usr.name = name
                        teacher.designation = desig
                        teacher.branch = branch
                        teacher.about = about
                        teacher.linkedin_link = linkedin
                        teacher.youtube_link = youtube
                    usr.save()
                    teacher.save()
                    return Response({ 'message': 'successfully profile updated' })        
            if user.is_student:
                name = data['name']
                branch = data['branch']
                sem = int(data['semester'])
                about = data['about']
                usr = CustomUser.objects.filter(email=request.user.email)
                if usr.count():
                    usr = usr[0]
                    student = Student.objects.filter(user = usr)
                    if student.count():
                        student = student[0]
                        usr.name = name
                        student.branch = branch
                        student.about= about
                    usr.save()
                    student.save()
                    return Response({ 'message': 'successfully profile updated' })
            return Response({ 'message': 'Invalid User' },status=status.HTTP_401_UNAUTHORIZED)

        else:
            return Response({ 'message': 'Not Authenticated' },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })

@csrf_protect
@permission_classes([permissions.AllowAny])
@api_view(('POST',))
def Login(request):
    data = request.data
    email = data['email']
    password = data['password']

    try:
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            type_obj = CustomUser.objects.get(email=email)
            if user.is_authenticated and type_obj.is_student:
                return Response({'type': 'student'},headers={'Access-Control-Allow-Credentials': 'true'}) 
            elif user.is_authenticated and type_obj.is_teach:
                return Response({'type':'teacher'},headers={'Access-Control-Allow-Credentials': 'true'}) 
        else:
            return Response({'message':'Invalid Login ID/Password','error':True},status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong while Login' })
        return Response({ 'message': str(e) })



@csrf_protect
@api_view(('POST',))
def Logut(request):
    try:
        logout(request)
        return Response({ 'message': 'Loggout Out' })
    except Exception as e:
        # return Response({ 'error': 'Something went wrong while Lggout' })
        return Response({ 'message': str(e) })
    
@permission_classes([permissions.IsAuthenticated])
@csrf_protect
@api_view(('GET',))
def getProfile(request):
    user = request.user
    try:
        isAuth = user.is_authenticated
        if isAuth:
            if user.is_teach:
                usr = CustomUser.objects.filter(email=request.user.email)
                if usr.count():
                    usr = usr[0]
                    teacher = Teacher.objects.filter(user = usr)
                    if teacher.count():
                        teacher = teacher[0]
                        desig = teacher.designation
                        if user.is_HOD:
                            desig = "Head Of Department"
                        dict = {
                            "profilePic" : usr.img,
                            "name" : usr.name,
                            "designation" : desig,
                            "branch": teacher.branch,
                            "about": teacher.about,
                            "linkedin":teacher.linkedin_link,
                            "youtube":teacher.youtube_link
                        }
                        return Response(dict)
            elif user.is_student:
                usr = CustomUser.objects.filter(email=request.user.email)
                if usr.count():
                    usr = usr[0]
                    student = Student.objects.filter(user=usr)
                    if student.count():
                        student = student[0]
                        dict = {
                            "profilePic" : usr.img,
                            "name" : usr.name,
                            "branch": student.branch,
                            "semester" : student.sem,
                            "about": student.about,
                        }
                        return Response(dict)
            return Response({ 'message': 'Invalid User' },status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({ 'message': 'Not Authenticated' },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # return Response({ 'error': 'Something went wrong when checking authentication status' })
        return Response({ 'message': str(e) })

@permission_classes([permissions.IsAuthenticated])
@csrf_protect
@api_view(('GET',))
def teacherDashboard(request):
    user = request.user
    try:
        if user.is_authenticated:
            if user.is_teach:
                if (request.method == 'GET'):
                    obj = subj_collection_handle.find({"author_email": request.user.email},{
                "_id": { "$toString": "$_id" },
                "c_name": 1,
                "sem": 1,
                "summary": 1,
                "branch": 1,
                "units": 1,
                "start_date": 1,
                "author_email": 1,
                "author_name": 1,
                "syllabus_link": 1,
                "book_link": 1,
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