from django.contrib.auth.models import AbstractUser,Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 
    ROLES = (
        ('TA', 'TA Applicants'),
        ('DS', 'Department Staff'),
        ('TAC', 'TA Committee Members'),
        ('I', 'Instructors'),
        ('A', 'Administrators'),
    )
    groups = models.ManyToManyField(Group, related_name='custom_user_groups' ,blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True)
    role = models.CharField(max_length=3, choices=ROLES, default='TA')
    class Meta:
       app_label = 'api'

    def __str__(self):
        return self.username
    
class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    code = models.CharField(max_length=20)
    class Meta:
       app_label = 'api'
       
    def __str__(self):
        return self.name

class TAApplication(models.Model):
    full_name = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    contact_number = models.CharField(max_length=15)
    address = models.TextField()
    cv_file = models.FileField(upload_to='cv_files/', null=True, blank=True)
    has_experience = models.BooleanField(default=False)
    relevant_courses = models.ManyToManyField('Course', blank=True)
    assigned_course =  models.CharField(max_length=150, default="")
    experience_dates = models.CharField(max_length=255, blank=True)
    is_approved = models.BooleanField(default=False)
    feedback = models.CharField(max_length=150, default="")
    ratings = models.IntegerField(default=0)
    is_reviewed = models.BooleanField(default=False)

    class Meta:
       app_label = 'api'
    def __str__(self):
        return self.full_name