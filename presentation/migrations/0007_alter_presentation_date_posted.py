# Generated by Django 4.0.3 on 2022-04-27 03:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('presentation', '0006_alter_presentation_file_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presentation',
            name='date_posted',
            field=models.DateField(auto_now_add=True, verbose_name='Date'),
        ),
    ]
