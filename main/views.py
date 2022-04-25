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


class RegisterViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, 
                        mixins.CreateModelMixin, mixins.RetrieveModelMixin, 
                        mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
# class UserDetails(viewsets.ModelViewSet, mixins.RetrieveModelMixin, 
#                     mixins.UpdateModelMixin, mixins.DestroyModelMixin):

#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     lookup_field = 'id'

#     def get(self, request, id):
#         return self.retrieve(request, id=id)

#     def put(self, request, id):
#         return self.update(request, id=id)
    
#     def delete(self, request,id):
#         return self.destroy(request, id=id)




    # def list(self, request):
    #     users = User.objects.all()
    #     serializer = UserSerializer(users, many=True)
    #     return Response(serializer.data)

    # def create(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


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
