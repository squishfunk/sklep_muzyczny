from django.db import models
from django.conf import settings

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    artist = models.ForeignKey("Artist", on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    quantity = models.IntegerField(null=True)
    image = models.ImageField(upload_to='files/products')

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_date = models.DateField()
    active = models.BooleanField()

    def __str__(self):
        return self.name

class OrderProduct(models.Model):
    product = models.ForeignKey("Product", on_delete=models.DO_NOTHING)
    order = models.ForeignKey("Order", on_delete=models.CASCADE)
    quantity = models.IntegerField()


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=200)
    address2 = models.CharField(max_length=200, blank=True)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)
    def __str__(self):
        return str(self.id)