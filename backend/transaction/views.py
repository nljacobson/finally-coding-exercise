from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .serializers import TransactionSerializers
from .models import Transaction
from account.models import Account
# Create your views here.

class AdminTransactionView(viewsets.ModelViewSet):
    serializer_class = TransactionSerializers
    queryset = Transaction.objects.all()
    def post(request):
        try:
            id = request.GET['id']
            date = request.GET['date']
            transaction_type = request.GET['transaction_type']
            note = request.GET['note']
            amount = request.GET['amount']
            account_id = request.GET['account_id']
            new_entry = Transaction(
                id=id,
                date=date, 
                transaction_type=transaction_type, 
                note=note,
                amount=amount,
                account_id=account_id,
                )
            new_entry.save()
            # Modify account in question
            net_change = int(amount)
            if transaction_type: # If Debit, make net_change negative
                net_change = -net_change
            account = Account.objects.get(account_id = id)
            account.current_balance = account.current_balance + net_change
            account.save()
            return Response(status=status.HTTP_201_CREATED)
        except KeyError:
            print('KeyError')
            return Response([], status=status.HTTP_400_BAD_REQUEST)


class UserTransactionView:
    permission_classes = [permissions.IsAuthenticated]
    @api_view(('GET',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def get(request):
        try:
            id = request.GET['id']
            # find all accounts associated with id
            accounts = Account.objects.filter(user_id = id)
            transactions = []
            for account in accounts:
                transaction = Transaction.objects.filter(account_id = account.account_id)
                serializer = TransactionSerializers(transaction, many=True)
                if serializer.data:
                    transactions.append(serializer.data)
            return Response(transactions, status=status.HTTP_200_OK)
        except KeyError:
            # Case of no transactions under that ID
            return Response([], status=status.HTTP_200_OK)