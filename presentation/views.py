from .serializers import (
    CategorySerializer,
    PresentationSerializer,
)
from .models import (
    Category,
    Presentation,
)
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.


class CategoryView(APIView):

    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)


class PresentationPost(APIView):
    serializer_class = PresentationSerializer

    def get(self, request, *args, **kwargs):
        presentation = Presentation.objects.all()
        serializer = self.serializer_class(presentation, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PresentationDetail(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Presentation.objects.all()
    serializer_class = PresentationSerializer
