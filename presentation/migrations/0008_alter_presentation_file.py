# Generated by Django 4.0.3 on 2022-04-27 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('presentation', '0007_alter_presentation_date_posted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presentation',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='media'),
        ),
    ]
