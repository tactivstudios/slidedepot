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
    class Meta:
        model = Presentation
        fields = '__all__'
