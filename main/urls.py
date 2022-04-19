from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    # ArticleViewSet,
    # UserViewSet,
    CategoryView,
    PresentationView,
)


router = DefaultRouter()
# router.register('articles', ArticleViewSet, basename='articles')
# router.register('users', UserViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    # path('articles/', ArticleList.as_view()),
    # path('articles/<int:id>/', ArticleDetails.as_view()),
    # path('articles/<int:pk>', article_details),
    path('upload-presentation/', PresentationView.as_view(),name='upload-presentation'),
    path('category/', CategoryView.as_view(), name='category'),
]
