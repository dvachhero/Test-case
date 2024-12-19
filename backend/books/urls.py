from django.urls import path, include
from . import views
from rest_framework import routers
from .views import AuthorViewSet, BookViewSet

router = routers.DefaultRouter()
router.register(r'author', AuthorViewSet)
router.register(r'book', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
