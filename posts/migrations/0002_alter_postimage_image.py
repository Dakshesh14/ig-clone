# Generated by Django 3.2.5 on 2022-01-12 15:27

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimage',
            name='image',
            field=imagekit.models.fields.ProcessedImageField(upload_to='posts/%Y/%m/%d'),
        ),
    ]