# Generated by Django 4.0.3 on 2022-04-12 10:17

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Presentation',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True)),
                ('file', models.FileField(default=django.utils.timezone.now, upload_to='save_file')),
                ('thumbnail_image', models.FileField(default=django.utils.timezone.now, upload_to='thumbnail_images')),
                ('title', models.TextField(blank=True, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.category')),
            ],
        ),
    ]
