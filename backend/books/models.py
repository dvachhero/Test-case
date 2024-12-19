from django.db import models

# Create your models here.

class Author(models.Model):
    def __str__(self):
        return self.surname + " " + self.name
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)


class Book(models.Model):
    def __str__(self):
        return self.title
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    author =  models.ForeignKey(Author, on_delete=models.CASCADE)


