from rest_framework import serializers
from .models import (
    Category,
    Presentation,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PresentationSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField()
    category = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Category.objects.all())

    class Meta:
        model = Presentation
        fields = (
            'id',
            'file',
            'file_name',
            'thumbnail_image',
            'title',
            'date_posted',
            'category'
        )

    def get_file_name(self, instance):
        return instance.file.name
