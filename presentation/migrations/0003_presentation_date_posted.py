# Generated by Django 4.0.3 on 2022-04-25 09:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('presentation', '0002_alter_presentation_file_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='presentation',
            name='date_posted',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
