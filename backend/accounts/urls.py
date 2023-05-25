from django.urls import path
from . import views
urlpatterns = [
    path('',views.home),
    path('register',views.student_register),
    path('teacher_register',views.teacher_register),
    path('csrf_cookie',views.get_CSRF_token),
    path('login',views.Login),
    path('change_password',views.changePassword),
    path('upload_pic',views.uploadPP),
    path('update_profile',views.updateProfile),
    path('get_profile',views.getProfile),
    path('teacher_dashboard',views.teacherDashboard),
    path('authenticated',views.IsAuthenticated),
    path('logout',views.Logut)
]