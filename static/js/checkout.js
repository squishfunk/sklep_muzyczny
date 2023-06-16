/**
* Funkcja ustawia koszyk w widoku podsumowania
*/
function setCart(){
    var cart = getCartFromCookie();
    $.post(
        '/get_product_list',
        JSON.stringify(cart),
        (data) => {
            Object.keys(cart).forEach(product_id => {
                var quantity = cart[product_id];
                addProductToForm(product_id, quantity);
                addProductToView(product_id, quantity, data);
            });
        }
    );
}

/**
* Funkcja dodaje produkt do formularza "checkout"
* @param {string} product_id
* @param {*} quantity
*/
function addProductToForm(product_id, quantity) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.name = 'products_data[]';
    input.value = JSON.stringify({"product_id": product_id, "quantity": quantity});

    document.getElementById('checkoutForm').appendChild(input);
}

/**
* Funkcja dodaje produkt do sekcji "twój koszyk"
* @param {string} product_id
* @param {*} quantity
* @param {*} product_list
*/
function addProductToView(product_id, quantity, product_list){
    var li = $('<li>').addClass('list-group-item d-flex justify-content-between lh-sm');
    var div = $('<div>');

    var product_name = product_list[product_id]['name'];
    var product_price = product_list[product_id]['price'];
    if(quantity > 1){
        product_name += ' x'+quantity;
        product_price = `$${product_price} x ${quantity} = $${product_price * quantity}`;
    }

    var h6 = $('<h6>').addClass('my-0').text(product_name);
    var small = $('<small>').addClass('text-muted').text('Brief description');
    var span = $('<span>').addClass('text-muted').text(product_price);

    div.append(h6);
    div.append(small);
    li.append(div);
    li.append(span);
    $('#CheckoutCart').append(li);
}