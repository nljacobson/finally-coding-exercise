from django.db import models

# Create your models here.
class Account(models.Model):
    user_id = models.CharField(max_length=64) #Username of the user
    account_id = models.CharField(max_length=32) #Account ID
    current_balance = models.IntegerField() # Value in cents, move two decimals to print
    account_number = models.CharField(max_length = 16) # Unique ID

    def __str__(self):
        return self.account_id