from ast import Delete
from cgitb import lookup
from .serializers import (
    UserSerializer,
    CommentSerializer
)
from .models import (
    User,
    Comment
)
from rest_framework.decorators import APIView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from django.shortcuts import get_object_or_404

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
    # def list(self, request):
    #     users = User.objects.all()
    #     serializer = UserSerializer(users, many=True)
    #     return Response(serializer.data)

    # def create(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def retrieve(self, request, pk=None):
    #     queryset = User.objects.all()
    #     user = get_object_or_404(queryset, pk=pk)
    #     serializer = UserSerializer(user)
    #     return Response(serializer.data)

    # def update(self, request, pk=None):
    #     user = User.objects.get(pk=pk)
    #     serializer = UserSerializer(user, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

    # def destroy(self, request, pk=None):  
    #     user = User.objects.get(pk=pk)
    #     user.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

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
