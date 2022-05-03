from django.urls import path
from .views import (
    CategoryView,
    PresentationPost,
    PresentationDetail,
    ProfileDetail,
)


urlpatterns = [
    path('category/', CategoryView.as_view(), name='category'),
    path('upload-presentation/', PresentationPost.as_view(), name='upload-presentation'),
    path('pt-details/<str:presentation_id>/', PresentationDetail.as_view(), name='presentation-detail'),
    path('profile-details/<int:author>/', ProfileDetail.as_view(), name='profile-detail'),
]
