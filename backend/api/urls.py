from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users/', include('users.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('orders/', include('orders.urls')),
	path('token/', obtain_auth_token, name='api_token_auth'),
]
