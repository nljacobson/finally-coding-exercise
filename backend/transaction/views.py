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
            id = request.Get['id']
            date = request.Get['date']
            transaction_type = request.Get['transaction_type']
            note = request.Get['note']
            amount = request.Get['amount']
            account_id = request.Get['account_id']
        except KeyError:
            print(KeyError)
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
                print(transaction)
                serializer = TransactionSerializers(transaction, many=True)
                if serializer.data:
                    transactions.append(serializer.data)
            return Response(transactions, status=status.HTTP_200_OK)
        except KeyError:
            # Case of no transactions under that ID
            return Response([], status=status.HTTP_200_OK)