"""Backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include 
from rest_framework import routers
from account import views as account_views
from transaction import views as transaction_views
from authentication import views as login_views
router = routers.DefaultRouter()
router.register(r'accounts', account_views.AdminAccountView, 'account')
router.register(r'transactions', transaction_views.AdminTransactionView, 'transaction')
urlpatterns = [
    path("admin/", admin.site.urls),
    path('login/', login_views.LoginView.as_view()),
    path('api/', include(router.urls)),
    path('myAccounts/', account_views.UserAccountView.get),
    path('myTransactions/', transaction_views.UserTransactionView.get),
]
