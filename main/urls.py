from email.mime import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterViewSet,
    CommentView,
)

router = DefaultRouter()
router.register('users', RegisterViewSet, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
    path('comment/', CommentView.as_view(), name='comment')
]
