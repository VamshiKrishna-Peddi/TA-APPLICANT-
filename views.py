from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer, TAApplicationSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from .models import TAApplication

from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer


class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    @csrf_exempt
    def create(self, request, *args, **kwargs):
        request.data['password'] =  make_password(request.data['password'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'message': 'Login successful', 'user_id': user.id, 'username': user.username, 'email': user.email, 'role': user.role, 'token': token.key})
    else:
        return JsonResponse({'message': 'Invalid email or password'}, status=400)
    



class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)


class TAApplicationListView(generics.ListCreateAPIView):
    queryset = TAApplication.objects.all()
    serializer_class = TAApplicationSerializer
    permission_classes = [IsAuthenticated]

class TAApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TAApplication.objects.all()
    serializer_class = TAApplicationSerializer
    permission_classes = [IsAuthenticated]
    

class CourseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer