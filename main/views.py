from cgitb import lookup
from django import http
from .serializers import (
    UserSerializer,
    CategorySerializer,
    PresentationSerializer,
)
from .models import (
    User,
    Category,
    Presentation,
)
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated


# For Upload Presentation
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from main import serializers


#bag o
class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

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
