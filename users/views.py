from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics

from .serializers import UserSerializer

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
