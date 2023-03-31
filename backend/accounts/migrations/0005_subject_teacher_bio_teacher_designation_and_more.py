# Generated by Django 4.1.2 on 2023-01-19 18:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_hod_branch'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('name', models.CharField(max_length=50)),
                ('subj_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='teacher',
            name='bio',
            field=models.CharField(blank=True, max_length=256),
        ),
        migrations.AddField(
            model_name='teacher',
            name='designation',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='teacher',
            name='youtube_link',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.CreateModel(
            name='Enroll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.subject')),
            ],
        ),
    ]