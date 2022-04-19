from cgitb import lookup
from django import http
from .serializers import (
    CategorySerializer,
    PresentationSerializer,
)
from .models import (
    Category,
    Presentation,
)


# For Upload Presentation
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from main import serializers



class CategoryView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)


class PresentationView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = PresentationSerializer

    def get(self, request, *args, **kwargs):
        presentations = Presentation.objects.all()
        serializer = self.serializer_class(presentations, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

