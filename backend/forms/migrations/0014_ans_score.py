# Generated by Django 4.1.2 on 2023-04-18 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0013_question_negative_score_question_postive_score_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ans',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]
