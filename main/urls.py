from email.mime import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AuthViewSet,
    RegisterViewSet,
    CommentView,
)

router = DefaultRouter()
router.register('users', RegisterViewSet, basename='users')
router.register('auth/', AuthViewSet, basename='auth')

urlpatterns = [
    path('api/', include(router.urls)),
    path('comment/', CommentView.as_view(), name='comment'),
]
