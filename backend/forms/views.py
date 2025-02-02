from django.shortcuts import render
from django.views.defaults import permission_denied,page_not_found,server_error
from django.urls import reverse
from django.contrib.auth import logout
from django.http import HttpResponse,JsonResponse,HttpResponseRedirect
from django.http.response import StreamingHttpResponse
from .models import Options,Question,Ans,Exam,Responses
from accounts.models import CustomUser
from django.contrib.auth.decorators import login_required
import json
import random
import requests
import string
import uuid

# Create your views here.
def logout_request(request):
	logout(request)
	return HttpResponse("logout success")

def index(request):
    user = request.user
    if user.is_authenticated:
        form = Exam.objects.filter(owner=request.user.email)
        if request.method == "GET":
            if form.count() == 0:
                return render(request,'index.html')
            if form[0].owner != request.user:
                return HttpResponse("You are not authorised to access this form")
            else:
                return render(request,'index.html', context={'form':form,'count':form.count()})
    else:
        return HttpResponseRedirect("http://127.0.0.1:3000")

def create(request):
    if request.method == "POST":
        if(request.user.is_teach):
            data = json.loads(request.body)
            title = data["title"]
            exam_id = str(uuid.uuid4()).replace('-','')[0:30]
            form = Exam(uuid= exam_id, title= title, owner= request.user)
            form.save()
            return JsonResponse({"message": "Sucessfully created exam", "code": exam_id})
        else:
            return JsonResponse({'status':'false','message':"You are not authorised to access this form"}, status=401)
        

##############################################################################################################################
##############################################################################################################################
##############################################################################################################################


################################################## Forms Config API ##########################################################

def edit_form(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    else:
        return render(request,'exam_form.html',{"code" : id,'form':form})

def form_publish(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        form.is_publish = True
        form.save()
        return JsonResponse({"message" : "Success"})

def delete_form(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        form = Exam.objects.filter(uuid=data["id"])
        if form.count() == 0:
            return HttpResponse("exam form not found")
        else:
            form = form[0]
        if form.owner != request.user:
            return HttpResponse("You are not authorised to access this form")
        
        for i in form.questions.all():
            for j in i.options.all():
                j.delete()
            i.delete()
        for i in Responses.objects.filter(response_to = form):
            for j in i.response.all():
                j.delete()
            i.delete()
        form.delete()
        return JsonResponse({"message" : "Success"})


def edit_title(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        if len(data["title"]) > 0 :
            form.title = data["title"]
            form.save()
        else:
            form.title = form.title[0]
            form.save()
        return JsonResponse({"message" : "Success"})
def edit_desc(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        form.desc = data["description"]
        form.save()
        return JsonResponse({"message": "Success", "description": form.desc})

################################################## Forms Config API END ##########################################################

##############################################################################################################################
##############################################################################################################################
##############################################################################################################################

################################################## Question API START ##########################################################

def add_question(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        if data["type"] == "mcq" or data["type"] == "msq":
            choices = Options(optn = "Option 1")
            choices.save()
            question = Question(q_type=data["type"], ques="Untitled Question", req=False)
            question.save()
            question.options.add(choices)
            question.save()
            form.questions.add(question)
            form.save()
            return JsonResponse({'question': {'ques': "Untitled Question", 'q_type': question.q_type, 'req': False, 'id': question.id},
            'choices': {'optn': "Option 1", 'is_correct': False, 'id': choices.id}})
        else:
            question = Question(q_type=data["type"], ques="Untitled Question", req=False)
            question.save()   
            form.questions.add(question)
            form.save()
            return JsonResponse({'question': {'ques': "Untitled Question", 'q_type': question.q_type, 'req': False, 'id': question.id}})
        

def edit_question(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        quest_id = data["id"]
        question = Question.objects.filter(id=quest_id)
        if question.count() == 0:
            return HttpResponse("Question not found")
        else:
            question = question[0]
        question.ques = data["question"]
        question.q_type = data["q_type"]
        question.req = data["req"]
        question.save()
        return JsonResponse({"message" : "Success"})

def delete_question(request,id,q_id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "DELETE":
        question = Question.objects.filter(id=q_id)
        if question.count() == 0:
            return HttpResponse("Question not found")
        else:
            question = question[0] 
        for choice in question.options.all():
            choice.delete()
        question.delete()
        return JsonResponse({"message" : "Success"})
    


def add_score(request,id,q_id):
    form = Exam.objects.filter(uuid=id)
    data = json.loads(request.body)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        question = Question.objects.filter(id=q_id)
        if question.count() == 0:
            return HttpResponse("Question not found")
        else:
            question = question[0]
        if data['score'] == '':
            question.postive_score = 0
        else:
            question.postive_score = int(data["score"])
        question.save()
    return JsonResponse({"message" : "Success"})
    

################################################## Question API END ##########################################################

##############################################################################################################################
##############################################################################################################################
##############################################################################################################################

################################################## Choice API START ##########################################################

def add_choice(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        choice = Options(optn="Option")
        choice.save()
        form.questions.get(pk=data["question"]).options.add(choice)
        form.save()
        return JsonResponse({"message":"Success", "choice": choice.optn,"id": choice.id})
    

def edit_choice(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        optn_id = data["id"]
        choice = Options.objects.filter(id=optn_id)
        if choice.count() == 0:
            return HttpResponse("choices not found")
        else:
            choice = choice[0]
        choice.optn = data["option"]
        choice.save()
        return JsonResponse({"message": "Success"})


def remove_choice(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    if form.owner != request.user:
        return HttpResponse("You are not authorised to access this form")
    if request.method == "POST":
        data = json.loads(request.body)
        choice = Options.objects.filter(id=data["id"])
        if choice.count() == 0:
            return HttpResponse("choices not found")
        else: choice = choice[0]
        choice.delete()
        return JsonResponse({"message": "Success"})

################################################## Choice API END ##########################################################

##############################################################################################################################
##############################################################################################################################
##############################################################################################################################

################################################## MISC START ##########################################################

def view_exam(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
    return render(request,"view_exam.html",context={"form":form})

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
@login_required
def submit_exam(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count() == 0:
        return HttpResponse("exam form not found")
    else:
        form = form[0]
        if request.user.is_authenticated:
            profile = CustomUser.objects.get(email=request.user.email)
        else: 
            profile = None
    if request.method == "POST":
        response_id = str(uuid.uuid4()).replace('-','')[0:20]
        response = Responses(response_code=response_id,response_to=form,responder=request.user,
                             responder_ip=get_client_ip(request),responder_email=profile.email)
        response.save()
        for i in request.POST:
            if i == "csrfmiddlewaretoken":
                continue
            question = form.questions.get(id=i)
            for j in request.POST.getlist(i):
                answer = Ans(ans=j,corresponds=question)
                answer.save()
                response.response.add(answer)
                response.save()
        return HttpResponseRedirect(reverse('form'))


@login_required
def response(request,id,res_code):
    form = Exam.objects.filter(uuid=id)
    if form.count()==0:
        return HttpResponseRedirect(reverse('404'))
    else: form = form[0]
    res = Responses.objects.filter(response_code = res_code)
    if res.count() == 0:
        return HttpResponseRedirect(reverse('404'))
    else: res = res[0]
    print(res.responder_ip)
    return render(request, "exam_response.html", {
        "form": form,
        "response": res,
        'user':res.responder
    })

@login_required
def responses(request,id):
    form = Exam.objects.filter(uuid=id)
    if form.count()==0:
        return HttpResponse('<h1>page-not-found</h1>')
    else: form = form[0]
    if form.owner.email != request.user.email:
        return HttpResponse('<h1>permission denied>')
    else:
        resps = Responses.objects.filter(response_to=form.id)
        
        return render(request,'responses.html',context={'user':request.user,'responses':resps})


def add_marks(request,id,res_code):
    form = Exam.objects.filter(uuid=id)
    if form.count()==0:
        return HttpResponseRedirect(reverse('404'))
    else: form = form[0]
    res = Responses.objects.filter(response_code = res_code)
    if res.count() == 0:
        return HttpResponseRedirect(reverse('404'))
    else: res = res[0]
    data = json.loads(request.body)
    answers = res.response.all()
    ans = answers.filter(corresponds=int(data['qid']))
    if ans.count() == 0:
        return HttpResponseRedirect(reverse('404'))
    print(ans)
    ans = ans[0]
    print(ans)
    if data['score'] == '':
        return JsonResponse({"message":"Empty Marks cannot be set"}, status=400)
    else:
        ans.score = int(data['score'])
        ans.save()
    return JsonResponse({"message":"success"})