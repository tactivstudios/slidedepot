from .serializers import (
    UserSerializer,
    CommentSerializer,
    # CategorySerializer,
    # PresentationSerializer
)
from .models import (
    User,
    Comment
    # Category,
    # Presentation
)

# from rest_framework.generics import (
#     RetrieveAPIView,
#     DestroyAPIView,
# )
from rest_framework.decorators import APIView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from django.shortcuts import get_object_or_404, redirect

class RegisterViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, 
                        mixins.CreateModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, mixins.DestroyModelMixin):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserAccount(UserSerializer, RegisterViewSet): 

    serializer_class = UserSerializer

    def put(self, request, **kwargs):
        serializer = self.serializer_class(request.user,request.data,request=request)
        serializer.is_valid(false_exception=True)
        serializer.save()
        return Response(serializer.data, status=200) 


def logout(request):
    if request.method == 'POST':
        request.user.auth_token.delete()

        logout(request)
        return Response('User Logged out successfully!')

         
# Comment
class CommentView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        comment = Comment.objects.all()
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        comment_serializer = CommentSerializer(data=request.data)
        if comment_serializer.is_valid():
            comment_serializer.save()
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('ERROR', comment_serializer.errors)
            return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CategoryView(APIView):

#     def get(self, request, *args, **kwargs):
#         category = Category.objects.all()
#         serializer = CategorySerializer(category, many=True)
#         return Response(serializer.data)


# class PresentationPost(APIView):
#     serializer_class = PresentationSerializer

#     def get(self, request, *args, **kwargs):
#         presentation = Presentation.objects.all()
#         serializer = self.serializer_class(presentation, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# class PresentationDetail(RetrieveAPIView, DestroyAPIView):
#     lookup_field = "presentation_id"
#     queryset = Presentation.objects.all()
#     serializer_class = PresentationSerializer

#     def presentation_delete(request, presentation_id):
#         presentation = get_object_or_404(
#             Presentation, presentation_id=presentation_id)
#         if presentation.thumbnail_image:
#             presentation.thumbnail_image.delete()
#         presentation.delete()
#         return redirect("/profile/")


# class ProfileDetail(RetrieveAPIView):
#     lookup_field = "author"
#     queryset = Presentation.objects.all()
#     serializer_class = PresentationSerializer