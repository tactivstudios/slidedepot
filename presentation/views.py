from .serializers import (
    CategorySerializer,
    PresentationSerializer,
)
from .models import (
    Category,
    Presentation,
)
from rest_framework.generics import (
    RetrieveAPIView,
    DestroyAPIView,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, redirect


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


class PresentationDetail(RetrieveAPIView, DestroyAPIView):
    lookup_field = "id"
    queryset = Presentation.objects.all()
    serializer_class = PresentationSerializer

    def presentation_delete(request, presentation_id):
        presentation = get_object_or_404(Presentation, id=presentation_id)
        if presentation.thumbnail_image:
            presentation.thumbnail_image.delete()
        presentation.delete()
        return redirect("/profile/")
