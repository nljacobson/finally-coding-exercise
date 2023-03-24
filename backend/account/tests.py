from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User

from .views import UserAccountView, AdminAccountView
from transaction.views import UserTransactionView, AdminTransactionView
# Create your tests here.
class AccountTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='noah', email='nljacobs@uvm.edu', password='top_secret'
        )
    def test_details(self):
        # First, show that a transaction will in fact change an account's balance
        # Add 2 accounts
        request = self.factory.post('/addAccount/?user_id=testing&account_id=10&current_balance=400&account_number=0000100010001000')
        response = AdminAccountView.post(request)
        request.user = self.user
        request = self.factory.post('/addAccount/?user_id=testing&account_id=11&current_balance=10000&account_number=0000100010001020')
        response = AdminAccountView.post(request)
        # Get Accounts
        request = self.factory.get('/myAccounts/?id=testing')
        response = UserAccountView.get(request)
        # print(response.data)
        # Create Transaction
        request = self.factory.get('/addTransaction/?id=11&date=2000-02-14&transaction_type=1&note=starbucks&amount=1000&account_id=11')
        response = AdminTransactionView.post(request)
        # View account
        # Get Accounts
        request = self.factory.get('/myAccounts/?id=testing')
        response = UserAccountView.get(request)
        print(response.data)
        # Second, show that an accounts prior balance on said day can be accessed
        request = self.factory.get('getAccountPastBalance/?account_id=11&date=2000-02-13')
        response = UserAccountView.get_past_balance(request)
        print(response.data)
        # Test on day after transaction was made, show that an accounts prior balance on said day can be accessed
        request = self.factory.get('getAccountPastBalance/?account_id=11&date=2000-02-15')
        response = UserAccountView.get_past_balance(request)
        print(response.data)
