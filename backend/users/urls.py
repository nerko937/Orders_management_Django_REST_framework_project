from django.urls import include, path

from .views import UserListView, CurrentUserView

urlpatterns = [
    path('', UserListView.as_view()),
	path('self/', CurrentUserView.as_view()),
]
