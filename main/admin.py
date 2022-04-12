# from django.contrib.admin.models import LogEntry
from django.contrib import admin
from .models import (
    Presentation,
    Category,
)

# Register your models here.


admin.site.register(Category)
admin.site.register(Presentation)

# LogEntry.objects.all().delete()
