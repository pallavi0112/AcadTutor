from django.urls import path
from . import views

urlpatterns=[
    path('logout',views.logout_request,name="logout"),
    path('form',views.index,name="form"),
    path('create',views.create,name='create_form'),
    path('delete_form',views.delete_form,name='delete_form'),
    path('<str:id>/view_exam',views.view_exam,name='view_exam'),
    path('<str:id>/submit_exam',views.submit_exam,name='submit_exam'),
    path('<str:id>/edit', views.edit_form, name="edit_form"),
    path('<str:id>/form_publish', views.form_publish, name="form_publish"),
    path('<str:id>/edit_title', views.edit_title, name="edit_title"),
    path('<str:id>/edit_desc', views.edit_desc, name="edit_desc"),
    path('<str:id>/add_question', views.add_question, name="add_question"),
    path('<str:id>/edit_choice', views.edit_choice, name="edit_choice"),
    path('<str:id>/add_choice', views.add_choice, name="add_choice"),
    path('<str:id>/remove_choice', views.remove_choice, name="remove_choice"),
    path('<str:id>/edit_question', views.edit_question, name="edit_question"),
    path('<str:id>/delete_question/<str:q_id>', views.delete_question, name="delete_question"),
    path('<str:id>/add_score/<str:q_id>', views.add_score, name="add_score"),
    path('<str:id>/responses/', views.responses, name="responses"),
    path('<str:id>/response/<str:res_code>', views.response, name="response"),
    path('<str:id>/add_marks/<str:res_code>', views.add_marks, name="add_marks"),



]