from django.db import models

# Create your models here.
class Transaction(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.DateField()
    transaction_type = models.BooleanField() # Note, 0 = credit, 1 = debit
    note = models.CharField(max_length=256)
    amount = models.IntegerField()
    account_id = models.CharField(max_length=32) #Account ID

    def __str__(self):
        return str(self.id)