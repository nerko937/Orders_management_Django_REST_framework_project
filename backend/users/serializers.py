from django.contrib.auth.models import User
from rest_framework import serializers

from rest_auth.registration.serializers import RegisterSerializer


class NameRegistrationSerializer(RegisterSerializer):

  first_name = serializers.CharField(required=False)
  last_name = serializers.CharField(required=False)

  def custom_signup(self, request, user):
    user.first_name = self.validated_data.get('first_name', '')
    user.last_name = self.validated_data.get('last_name', '')
    user.save(update_fields=['first_name', 'last_name'])


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'is_staff')
