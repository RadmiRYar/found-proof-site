console.log("Скрипт загружен");

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " добавлено в корзину!");
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) {
        console.error("Элемент cart-modal не найден в HTML!");
        return;
    }
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        list.innerHTML += `<p>${item.name} — ${item.price}₽</p>`;
        total += item.price;
    });
    document.getElementById('total-price').innerText = total;
    modal.style.display = 'block';
}

function checkout() {
    alert("Переход к оплате на сумму " + document.getElementById('total-price').innerText + "₽");
}