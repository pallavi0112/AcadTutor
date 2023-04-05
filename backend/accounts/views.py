from rest_framework.decorators import permission_classes,api_view
from rest_framework import permissions
from . models import CustomUser,Teacher,HOD,Student
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import authenticate,login,logout
from django.http import HttpResponse
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
                        teacher = Teacher(hod=Hod,user=user)
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