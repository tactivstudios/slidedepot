from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterViewSet,
    CommentView,
)

router = DefaultRouter()
router.register('users', RegisterViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('comment/', CommentView.as_view(), name='comment')
]
