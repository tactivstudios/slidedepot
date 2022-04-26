from argparse import Action
from crypt import methods
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
from django.core.exceptions import ImproperlyConfigured
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model, logout
from rest_framework.permissions import AllowAny, IsAuthenticated

from .import serializers
from .utils import get_and_authenticate_user


User = get_user_model()

class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = serializers.EmptySerializer
    serializer_classes = {
        'login': serializers.UserLoginSerializer,
        'password_change' : serializers.PasswordChangeSerializer,
    }

    @action(methods=['POST', ], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)
        data = serializers.AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_200_OK)

    @action(method=['POST', ], detail=False)
    def logout(self, request):
        logout(request)
        data = {'success': 'Successfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False, permission_classes=[IsAuthenticated, ])
    def password_change(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raised_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()


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
