from telnetlib import STATUS
from django.contrib.auth import authenticate
from rest_framework import serializers, status


def get_and_authenticate_user(email, password):
    user = authenticate(username=email, password=password)
    if user is None:
        raise serializers.ValidationError(status=status.HTTP_400_BAD_REQUEST)
    return user