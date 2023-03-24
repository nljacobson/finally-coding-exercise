from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .serializers import AccountSerializer

from .models import Account

# Create your views here.
class AdminAccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class UserAccountView:
    permission_classes = [permissions.IsAuthenticated]
    @api_view(('GET',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def get(request):
        id = request.GET['id']
        # find all accounts associated with id
        accounts = Account.objects.filter(user_id = id)
        print(accounts)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)