from .models import Article
from .register import ArticleSerializers, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


# from django.views.decorators.csrf import csrf_exempt

#Get_post
# @csrf_exempt

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
