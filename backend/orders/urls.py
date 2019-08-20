from django.urls import path

from .views import OrderListView, ProgressListView, OrderView, ProgressView

urlpatterns = [
    path('', OrderListView.as_view(), name='orders'),
	path('<int:pk>/', OrderView.as_view(), name='order'),
	path('progresses/', ProgressListView.as_view(), name='progresses'),
	path('progresses/<int:pk>/', ProgressView.as_view(), name='progress'),
]