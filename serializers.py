from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser, TAApplication, Course

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'last_login', 'date_joined']
        
class TAApplicationSerializer(serializers.ModelSerializer):
    # Assuming CustomUser model has an 'email' field
    email = serializers.EmailField(write_only=True)
    relevant_courses = serializers.SlugRelatedField(
       many=True,
       read_only=False,
       slug_field='name',
       queryset=Course.objects.all()
   )
    class Meta:
        model = TAApplication
        fields = ['pk', 'full_name', 'email', 'contact_number', 'address', 'cv_file', 'has_experience', 'relevant_courses', 'experience_dates', 'assigned_course' ,'is_reviewed', 'feedback', 'ratings', 'is_approved', 'user']

    def create(self, validated_data):
        # user_email = validated_data.pop('email')
        # if(not validated_data['has_experience']):
        #     validated_data.pop('relevant_courses')
        
        # custom_user = CustomUser.objects.filter(email=user_email).first()
        # if not custom_user:
        #     raise Exception("Invalid Email address")
        # ta_application = TAApplication.objects.create(user=custom_user, **validated_data)
        # return ta_application
        user_email = validated_data.pop('email')
        courses = None
        courses = validated_data.pop('relevant_courses')
        custom_user = CustomUser.objects.filter(email=user_email).first()
        if not custom_user:
            raise Exception("Invalid Email address")
        ta_application = TAApplication.objects.create(**validated_data)
        if courses:
            ta_application.relevant_courses.set(courses)
        return ta_application

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

