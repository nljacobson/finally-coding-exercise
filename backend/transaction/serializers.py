from rest_framework import serializers
from .models import Transaction

class TransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'date', 'time', 'transaction_type', 'note', 'amount', 'account_id')