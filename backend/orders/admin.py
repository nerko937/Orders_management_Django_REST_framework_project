from django.contrib import admin
from .models import Progress, Order


@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass