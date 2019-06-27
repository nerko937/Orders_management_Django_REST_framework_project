from django.contrib import admin
from django.urls import path, include
from orders.views import RegularOrderListView
from users.views import SignUpView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', RegularOrderListView.as_view(), name='main'),
    path('sign_up/', SignUpView.as_view(), name='sign_up'),
]
