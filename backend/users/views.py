from django.contrib.auth.models import User
from django.shortcuts import render
from django.views import View
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer


class UserListView(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class CurrentUserView(generics.RetrieveAPIView):

	serializer_class = UserSerializer
	permission_classes = (IsAuthenticated,)

	def get_object(self):
		return self.request.user


class SignUpView(View):

    def get(self, request):
        return render(request, 'sign_up.html')
