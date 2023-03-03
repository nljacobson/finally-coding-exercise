from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TransactionSerializers
from .models import Transaction
# Create your views here.

class TransactionView(viewsets.ModelViewSet):
    serializer_class = TransactionSerializers
    queryset = Transaction.objects.all()