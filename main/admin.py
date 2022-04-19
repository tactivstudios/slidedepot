# from django.contrib.admin.models import LogEntry
from django.contrib import admin
from .models import (
    # Article,
    Presentation,
    Category
)

# Register your models here.


# admin.site.register(Article)
# @admin.register(Article)
# class ArticleModel(admin.ModelAdmin):
#     list_filter = ('title', 'description')
#     list_display = ('title', 'description')


admin.site.register(Category)
admin.site.register(Presentation)

# LogEntry.objects.all().delete()
