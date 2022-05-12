from django.urls import path
from .views import (
    CategoryView,
    PresentationPost,
    PresentationGet,
    PresentationDetail,
)


urlpatterns = [
    path('category/', CategoryView.as_view(), name='category'),
    path('upload-presentation/', PresentationPost.as_view(),
         name='upload-presentation'),
    path('get-presentation/', PresentationGet.as_view(), name='get-presentation'),
    path('pt-details/<str:presentation_id>/',
         PresentationDetail.as_view(), name='presentation-detail'),
]
