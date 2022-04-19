from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryView,
    PresentationView,
)


router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('upload-presentation/', PresentationView.as_view(),name='upload-presentation'),
    path('category/', CategoryView.as_view(), name='category'),
]
