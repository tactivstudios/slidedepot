from django.urls import path
from .views import (
    CategoryView,
    PresentationDetail,
    PresentationPost,
)


urlpatterns = [
    path('category/', CategoryView.as_view(), name='category'),
    path('upload-presentation/', PresentationPost.as_view(), name='upload-presentation'),
    path('pt-details/<str:id>/', PresentationDetail.as_view(), name='presentation-detail'),
]
