from django.db import models
from django.utils.translation import gettext as _

# Create your models here.


class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    name = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name


class Presentation(models.Model):
    id = models.CharField(primary_key=True, max_length=200, unique=True)
    file = models.FileField(upload_to='save_file', null=True, blank=True)
    file_name = models.TextField(null=True, blank=True)
    thumbnail_image = models.ImageField(
        upload_to='thumbnail_images', null=True, blank=True)
    title = models.TextField(null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True)
    date_posted = models.DateField(_("Date"), auto_now_add=True)

    def __str__(self):
        return self.title
