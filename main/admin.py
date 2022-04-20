# from django.contrib.admin.models import LogEntry
from django.contrib import admin
from .models import (
    User,
    Comment
)

# Register your models here.
admin.site.register(User)
admin.site.register(Comment)

# LogEntry.objects.all().delete()
