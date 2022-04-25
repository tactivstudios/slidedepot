from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User,
    Comment
)

# Register your models here.
class UserAdmin(BaseUserAdmin):
    pass

admin.site.register(User)
admin.site.register(Comment)
