# Generated by Django 4.0.3 on 2022-04-20 07:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('presentation', '0001_initial'),
        ('main', '0005_merge_20220420_0655'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='presentation',
            name='category',
        ),
        migrations.AlterField(
            model_name='comment',
            name='presentation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='presentation.presentation'),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Presentation',
        ),
    ]