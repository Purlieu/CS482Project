# Generated by Django 2.1.3 on 2018-12-13 04:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='image',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AddField(
            model_name='game',
            name='release_date',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='game',
            name='title',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='game',
            name='owner',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]