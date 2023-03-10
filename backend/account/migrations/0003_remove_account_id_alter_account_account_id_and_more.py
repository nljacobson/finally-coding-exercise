# Generated by Django 4.1.7 on 2023-03-01 18:18

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_rename_accounter_number_account_account_number"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="account",
            name="id",
        ),
        migrations.AlterField(
            model_name="account",
            name="account_id",
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name="account",
            name="account_number",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
    ]
