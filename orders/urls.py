from django.urls import include, path

from .views import OrderListView, ProgressListView, OrderView, ProgressView, TestView

urlpatterns = [
    path('', OrderListView.as_view()),
	path('<int:pk>/', OrderView.as_view()),
	path('progresses/', ProgressListView.as_view()),
	path('progresses/<int:pk>/', ProgressView.as_view()),
	path('test/', TestView.as_view()),
]