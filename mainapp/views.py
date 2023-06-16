from django.shortcuts import *
from django.http import HttpResponse
from mainapp.models import Product, Order, OrderProduct
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core import serializers
from django.contrib import messages

import json
# Create your views here.


def index(request):
    all_entries = Product.objects.all()
    context = {'products': all_entries}
    return render(request, "home.html", context)

def product(request, id):
    product = get_object_or_404(Product, id=id)

    return render(request, 'product.html', {'product':product})

def checkout(request):
    if request.method == 'POST':
        # Pobierz przekazane dane z request.POST
        products_data = request.POST.getlist('products_data[]')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        address = request.POST.get('address')
        address2 = request.POST.get('address2')
        state = request.POST.get('state')
        zip_code = request.POST.get('zip')

        try:
            if request.user.is_authenticated:
                user = request.user
            else:
                user = User.objects.create(username='Anonim')

            order = Order.objects.create(
                user=user,
                first_name=first_name,
                last_name=last_name,
                email=email,
                address=address,
                address2=address2,
                state=state,
                zip_code=zip_code
            )

            for product_data in products_data:
                product_data_dict = json.loads(product_data)

                product_id = product_data_dict['product_id']
                quantity = product_data_dict['quantity']

                product = Product.objects.get(id=product_id)

                OrderProduct.objects.create(order=order, product=product, quantity=quantity)

            messages.success(request, 'Dane zamówienia zostały zapisane')

        except Exception as e:
            messages.error(request, f'Błąd: {str(e)}')

        return redirect('index')
    else:
        return render(request, 'checkout.html', {})

@csrf_exempt
def get_product_list(request):
    data = json.loads(request.body)

    products = Product.objects.filter(id__in=data.keys())

    product_map = {product.id: {'name': product.name, 'price': str(product.price)} for product in products}
    json_data = json.dumps(product_map)
    return HttpResponse(json_data, content_type='application/json')


