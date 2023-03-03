from django.contrib import admin
from .models import Account
class AccountAdmin(admin.ModelAdmin):
    list_display = ('account_id', 'current_balance', 'account_number')
admin.site.register(Account, AccountAdmin)