# Generated by Django 4.0.3 on 2022-04-27 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('presentation', '0005_alter_presentation_file_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presentation',
            name='file_name',
            field=models.TextField(blank=True, null=True),
        ),
    ]
