from django.db import models
from django.utils import timezone

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    name = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name


class Presentation(models.Model):
    id = models.CharField(primary_key=True, max_length=200, unique=True)
    file = models.FileField(
        default=timezone.now, upload_to='save_file', null=False, blank=False)
    thumbnail_image = models.FileField(
        default=timezone.now, upload_to='thumbnail_images', null=False, blank=False)
    title = models.TextField(null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title
