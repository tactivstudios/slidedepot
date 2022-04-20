from rest_framework import serializers
from .models import (
    User,
    Comment
)

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

        extra_kwargs = {'password' : {
            'write_only' : True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('commenter_name', 'comment_body')
