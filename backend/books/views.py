from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AuthorSerializer, BookSerializer
from .models import Author, Book
from rest_framework.permissions import IsAuthenticated

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    #permission_classes = (IsAuthenticated, )
    

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    #permission_classes = (IsAuthenticated, )
# Create your views here.
