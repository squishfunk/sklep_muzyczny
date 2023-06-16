/**
 * Funkcja dodaje produkt do koszyka
 * @param {number} productId
 */
function addToCart(productId) {
    var cart = getCartFromCookie(); // Get the current state of the shopping cart

    if (cart[productId]) {
        // If the product already exists in the cart, increase its quantity
        cart[productId]++;
    } else {
        // If the product doesn't exist in the cart, add it with a quantity of 1
        cart[productId] = 1;
    }

    saveCartToCookie(cart); // Save the updated cart to the cookie
    getCartFromCookie();
}


/**
 * Funkcja usuwa produkt z koszyka
 * @param {number} productId
 */
function removeFromCart(productId) {
    var cart = getCartFromCookie(); // Get the current state of the shopping cart

    if (cart[productId]) {
        // If the product exists in the cart, decrease its quantity
        cart[productId]--;

        if (cart[productId] === 0) {
            // If the quantity reaches 0, remove the product from the cart
            delete cart[productId];
        }
    }

    saveCartToCookie(cart); // Save the updated cart to the cookie
}

/**
 * Funkcja zwraca koszyk (json) z cookie
 */
function getCartFromCookie() {
    var cookie = document.cookie;
    var cart = {};

    if (cookie) {
        var cookieArray = cookie.split(';');

        for (var i = 0; i < cookieArray.length; i++) {
            var cookiePair = cookieArray[i].trim().split('=');
            var key = decodeURIComponent(cookiePair[0]);
            if(key !== 'cart'){
                continue;
            }
            var value = decodeURIComponent(cookiePair[1]);

            // Check if the value in the cookie is a valid JSON object
            try {
                cart = JSON.parse(value);
            } catch (error) {
                // In case of parsing error, ignore that key and value
            }
        }
    }

    $('.cart_count').each(function() {
        Object.values(cart).length
        $(this).html(Object.keys(cart).length);
    });
    return cart;
}

/**
 * Funkcja zapisuje koszyk w cookie
 */
function saveCartToCookie(cart) {
    var cartJson = JSON.stringify(cart);
    document.cookie = 'cart=' + encodeURIComponent(cartJson) + '; path=/';
}