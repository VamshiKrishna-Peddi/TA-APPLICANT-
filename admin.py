# Register your models here.
from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import CustomUser, TAApplication, Course

class CustomAdminSite(AdminSite):
    site_title = 'TA Application'
    site_header = 'TA Application'
    index_title = 'TA Application'

# Instantiate the custom admin site
custom_admin_site = CustomAdminSite(name='customadmin')
custom_admin_site.register(CustomUser)
custom_admin_site.register(TAApplication)
custom_admin_site.register(Course)
