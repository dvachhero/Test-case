from rest_framework import serializers
from .models import Author, Book

class BookSerializer(serializers.ModelSerializer):
    author_surname = serializers.CharField(source='author.surname', required=False)
    author_name = serializers.CharField(source='author.name', required=False)
    class Meta:
        model = Book
        fields = ('id', 'title', 'year', 'author', 'author_surname', 'author_name') 

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'surname')

