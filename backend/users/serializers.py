from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name')