from .serializers import (
    CategorySerializer,
    PresentationSerializer,
)
from .models import (
    Category,
    Presentation,
)
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# For Upload Presentation
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status



class CategoryView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)


class PresentationView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        presentations = Presentation.objects.all()
        serializer = PresentationSerializer(presentations, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        presentation_serializer = PresentationSerializer(data=request.data)
        if presentation_serializer.is_valid():
            presentation_serializer.save()
            return Response(presentation_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('ERROR', presentation_serializer.errors)
            return Response(presentation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
