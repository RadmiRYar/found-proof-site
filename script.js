console.log("Скрипт сопряжения страниц загружен");

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
});

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.length;
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartBadge();
    showToast(`🛍️ ${name} добавлен в корзину!`);
}

function showToast(message) {
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function renderCartPage() {
    const list = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<p style="color: #e1e0e4; text-align: center; padding: 40px 0;">Ваша корзина пока пуста</p>';
    } else {
        cart.forEach((item, index) => {
            const itemPrice = parseInt(item.price) || 0; 
            list.innerHTML += `
                <div class="cart-item-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <span>${item.name} — ${itemPrice}₽</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-weight: 500;">Удалить</button>
                </div>
            `;
            total += itemPrice;
        });
    }
    
    if (totalElement) {
        totalElement.innerText = total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartBadge();
    renderCartPage();
}

function checkout() {
    if (cart.length === 0) {
        alert("Нельзя оплатить пустую корзину!");
        return;
    }
    alert("Переход к эквайрингу. Сумма к оплате: " + document.getElementById('total-price').innerText + "₽");
}