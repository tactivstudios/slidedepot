# from django.contrib.admin.models import LogEntry
from django.contrib import admin
from .models import (
    Article,
    Presentation,
    Category,
    Comment
)

# Register your models here.


# admin.site.register(Article)
@admin.register(Article)
class ArticleModel(admin.ModelAdmin):
    list_filter = ('title', 'description')
    list_display = ('title', 'description')


admin.site.register(Category)
admin.site.register(Presentation)
admin.site.register(Comment)

# LogEntry.objects.all().delete()
