# Generated by Django 4.1.2 on 2023-04-25 05:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0014_ans_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='negative_score',
        ),
        migrations.RemoveField(
            model_name='question',
            name='points',
        ),
    ]