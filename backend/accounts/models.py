import uuid
import base64
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from acadtutor.azure import upload
import requests


BRANCH_CHOICES = [
    ('CS', 'Computer Science Engineering'),
    ('CE', 'Civil Engineering'),
    ('ME', 'Mechanical Engineering'),
    ('ET', 'Electronics and Communication Engineering'),
    ('EE', 'Electrical and Electronics Engineering'),
]
class UserManager(BaseUserManager):

    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        user = self._create_user(email, password, True, True, **extra_fields)
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254,primary_key=True)
    name = models.CharField(max_length=254, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_teach = models.BooleanField(default=False)
    is_HOD = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    img = models.CharField(default="https://acadtutor.blob.core.windows.net/acadtutor/6769264_60111.jpg",max_length=100)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
    
    def __str__(self):
        if self.is_student == True:
            return self.email + " - is_student"
        else:
            return self.email + " - is_teacher"        
    def get_absolute_url(self):
        return "/users/%s/" % (self.pk)
    def get_email(self):
        return self.email

class HOD(models.Model):
    branch = models.CharField(null=True,choices=BRANCH_CHOICES, blank=True,max_length=10)
    college = models.CharField(null=True,blank=True,max_length=100)
    refid = models.CharField(max_length=300, blank=True, null=True,unique=True)   
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def generate_verification_code(self):
        return base64.urlsafe_b64encode(uuid.uuid1().bytes).rstrip(b'=').decode('ascii')

    def save(self, *args, **kwargs):
        if not self.pk:
            self.refid = self.generate_verification_code()
        return super(HOD, self).save(*args, **kwargs)
    def __str__(self):
        return CustomUser.get_email(self.user) + " - is_HOD"

class Teacher(models.Model):
    hod = models.ForeignKey(HOD,on_delete=models.CASCADE)
    branch = models.CharField(null=True,choices=BRANCH_CHOICES, blank=True,max_length=10)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,primary_key=True)
    designation = models.CharField(max_length=30,blank=True)
    youtube_link =  models.CharField(max_length=30,blank=True)
    linkedin_link =  models.CharField(max_length=30,blank=True)
    about = models.CharField(max_length=256,blank=True)
    def __str__(self):
        return CustomUser.get_email(self.user) + " - is_teacher"

class Student(models.Model):
    about = models.CharField(null=True,blank=True,max_length=1000)
    branch = models.CharField(null=True,blank=True,max_length=10)
    sem = models.IntegerField(null=True,blank=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,primary_key=True)
    def __str__(self):
        return CustomUser.get_email(self.user) + " - is_student"

class Subject(models.Model):
    name = models.CharField(max_length=50)
    subj_id = models.CharField(max_length=100,primary_key=True)

class Enroll(models.Model):
    student = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE)