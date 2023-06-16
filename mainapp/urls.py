from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('product/<int:id>', views.product, name = 'product'),
    path('producers', views.product, name = 'product'),
    path('checkout', views.checkout, name = 'checkout'),
    path('get_product_list', views.get_product_list, name = 'get_product_list')
]