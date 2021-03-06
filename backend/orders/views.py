from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import BasePermission, IsAdminUser, SAFE_METHODS
from django.views import View

from .serializers import OrderSerializer, ProgressSerializer
from .models import Order, Progress


class ReadOnly(BasePermission):
	def has_permission(self, request, view):
		return request.method in SAFE_METHODS


class OrderListView(generics.ListCreateAPIView):

	def get_queryset(self):
		queryset = Order.objects.all()
		order_name = self.request.query_params.get('order_name', None)
		if order_name is not None:
			queryset = queryset.filter(name__contains=order_name)
		return queryset

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


class RegularOrderListView(View):
	def get(self, request):
		return render(request, 'base.html')