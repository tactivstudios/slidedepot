import random
from django.db import models
from django.utils.translation import gettext as _
from django.utils import timezone

# Create your models here.


def generate_id():
    number = random.randint(10000, 99999)
    return 'PT{}{}'.format(timezone.now().strftime('%y%m%d'), number)


class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name


class Presentation(models.Model):
    presentation_id = models.CharField(
        default=generate_id, primary_key=True, max_length=200, unique=True)
    file = models.FileField(upload_to='save_file', null=True)
    file_name = models.TextField(null=True)
    thumbnail_image = models.ImageField(
        upload_to='thumbnail_images', null=True)
    title = models.TextField(max_length=200, null=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    date_posted = models.DateField(_("Date"), auto_now_add=True)
    author = models.ForeignKey(
        'main.User', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
