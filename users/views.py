from django.contrib.auth.models import User
from django.shortcuts import render
from django.views import View
from rest_framework import generics

from .serializers import UserSerializer


class UserListView(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class SignUpView(View):

    def get(self, request):
        return render(request, 'sign_up.html')
