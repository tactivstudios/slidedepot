from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import (
    User,
    Comment
)

from django.contrib.auth import password_validation

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']

        extra_kwargs = {'password' : {
            'write_only' : True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)
        instance = super(UserSerializer, self).update(instance, validated_data)

        if password:
            instance.set_password(password)
            instance.save()

        return instance

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=300, required = True)
    password = serializers.CharField(required = True, write_only = True)

class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        read_only_fields = ['id', 'is_active', 'is_staff']

    def get_auth_token(self, obj):
        token = Token.objects.create(user=obj)
        return token.key

class EmptySerializer(serializers.ModelSerializer):  
    pass      

class PasswordChangeSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validated_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError('Current password does not match')
        return value
    
    def validated_new_password(self, value):
        password_validation.validate_password(value)
        return value
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('commenter_name', 'comment_body')
