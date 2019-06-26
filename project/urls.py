from django.contrib import admin
from django.urls import path, include
from orders.views import RegularOrderListView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', RegularOrderListView.as_view()),
]
