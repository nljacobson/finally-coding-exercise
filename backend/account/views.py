from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .serializers import AccountSerializer
from transaction.models import Transaction
from .models import Account
from datetime import date
# Create your views here.
class AdminAccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    def post(request):
        try:
            user_id = request.GET['user_id']
            account_id = request.GET['account_id']
            current_balance = request.GET['current_balance']
            account_number = request.GET['account_number']
            new_entry = Account(
                user_id=user_id,
                account_id=account_id,
                current_balance=current_balance,
                account_number=account_number
                )
            new_entry.save()
            return Response(status=status.HTTP_201_CREATED)
        except KeyError:
            print(KeyError)
            return Response([], status=status.HTTP_400_BAD_REQUEST)

class UserAccountView:
    permission_classes = [permissions.IsAuthenticated]
    @api_view(('GET',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def get(request):
        id = request.GET['id']
        # find all accounts associated with id
        accounts = Account.objects.filter(user_id = id)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @api_view(('GET',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def get_past_balance(request):
        print(request)
        account_id = request.GET['account_id']
        check_date = date.fromisoformat(request.GET['date'])
        # find all accounts associated with id
        transactions = Transaction.objects.filter(account_id = account_id)
        account = Account.objects.get(account_id = account_id)
        current_balance = account.current_balance
        for transaction in transactions:
            if transaction.date < check_date:
                # Modify current_balance
                net_change = transaction.amount
                # If Credit, make net_change negative (opposite of direction of transaction)
                if not transaction.transaction_type: 
                    net_change = -net_change
                current_balance += net_change
        return Response(current_balance, status=status.HTTP_200_OK)