# Generated by Django 4.1.2 on 2023-04-30 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_customuser_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='about',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
