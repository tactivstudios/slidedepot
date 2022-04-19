from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

# Create your models here.
class CustomeUserManager(BaseUserManager):
    def _create_user(self, email, password, first_name, last_name, **extra_fields):
        if not email: 
            raise ValueError("Email must be provided")
        if not password:
            raise ValueError("Password is not provided")

        user = self.model(
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password,first_name, last_name, **extra_fields)

    def create_superuser(self, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, first_name, last_name, **extra_fields)
class User(AbstractBaseUser, PermissionsMixin):
        email = models.EmailField(db_index=True, unique=True, max_length=254)
        first_name = models.CharField(max_length=240)
        last_name = models.CharField(max_length=255)

        is_staff = models.BooleanField(default=True)
        is_active = models.BooleanField(default=True)
        is_superuser = models.BooleanField(default=False)

        objects = CustomeUserManager()

        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = 'first_name', 'last_name', 'password'

# class Article(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()

#     def __str__(self):
#         return self.title


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
