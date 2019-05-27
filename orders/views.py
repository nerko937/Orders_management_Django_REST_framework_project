from rest_framework import generics
from rest_framework.permissions import BasePermission, IsAdminUser, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OrderSerializer, ProgressSerializer
from .models import Order, Progress


class ReadOnly(BasePermission):
	def has_permission(self, request, view):
		return request.method in SAFE_METHODS


class OrderListView(generics.ListCreateAPIView):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer
	#permission_classes = (IsAdminUser | ReadOnly,)


class ProgressListView(generics.ListCreateAPIView):
	queryset = Progress.objects.all()
	serializer_class = ProgressSerializer
	#permission_classes = (IsAdminUser | ReadOnly,)


class OrderView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer
	#permission_classes = (IsAdminUser | ReadOnly,)


class ProgressView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Progress.objects.all()
	serializer_class = ProgressSerializer
	#permission_classes = (IsAdminUser | ReadOnly,)


