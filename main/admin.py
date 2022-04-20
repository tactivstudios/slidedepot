# from django.contrib.admin.models import LogEntry
from django.contrib import admin
from .models import (
    Presentation,
    Category,
    Comment
)

# Register your models here.

admin.site.register(Category)
admin.site.register(Presentation)
admin.site.register(Comment)

# LogEntry.objects.all().delete()
