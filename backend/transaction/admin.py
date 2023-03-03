from django.contrib import admin
from .models import Transaction
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'time', 'transaction_type', 'note', 'amount', 'account_id')
admin.site.register(Transaction, TransactionAdmin)