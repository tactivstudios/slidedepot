from django.urls import path
from .views import (
    CategoryView,
    PresentationView,
)


urlpatterns = [
    path('upload-presentation/', PresentationView.as_view(),name='upload-presentation'),
    path('category/', CategoryView.as_view(), name='category'),
]
