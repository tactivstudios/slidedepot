from rest_framework import serializers
from .models import (
    User,
    Comment,
    # Category,
    # Presentation,
)
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
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'


# class PresentationSerializer(serializers.ModelSerializer):
#     file_name = serializers.SerializerMethodField()
#     category = serializers.SlugRelatedField(
#         slug_field='name',
#         queryset=Category.objects.all())

#     class Meta:
#         model = Presentation
#         fields = (
#             'presentation_id',
#             'file',
#             'file_name',
#             'thumbnail_image',
#             'title',
#             'date_posted',
#             'category',
#             'author',
#         )

#     def get_file_name(self, instance):
#         return instance.file.name