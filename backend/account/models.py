from django.db import models
import uuid

# Create your models here.
class Account(models.Model):
    account_id = models.CharField(max_length=32) #Account ID
    current_balance = models.IntegerField() # Value in cents, move two decimals to print
    account_number = models.IntegerField(primary_key=True) # Unique ID

    def __str__(self):
        return self.id