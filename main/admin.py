# from django.contrib.admin.models import LogEntry
from django.contrib import admin
from .models import (
    User,
    Presentation,
    Category
)


admin.site.register(User)
admin.site.register(Category)
admin.site.register(Presentation)

# LogEntry.objects.all().delete()
