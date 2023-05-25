from django.urls import path
from django.urls import path
from . import views

urlpatterns = [
    path('addsubj',views.createSubj,name='createsubj'),
    path('addunit',views.addUnit,name='addunit'),
    path('addsubtopic',views.addSubTopic,name='addsubtopic'),
    path('add_assignment',views.addAssignment,name='addassignment'),
    path('<str:unit_id>/get_unit',views.getUnit,name='getunit'),
    path('<str:branch>/get_branch',views.getBranch,name='getbranch'),
    path('<str:subj_id>/get_subj',views.getSubj,name='getsubj'),
    path('<str:subtopic_id>/get_subtopic',views.getSubtopic,name='getsubtopic'),
    path('teacher_courses',views.getMyCourses,name='getMyCourses'),


]