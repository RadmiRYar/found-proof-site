console.log("Скрипт сопряжения страниц загружен");

// Загружаем сохраненную корзину или создаем пустую
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Как только страница загрузилась (неважно, главная это или cart.html)
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    // Проверяем: если на текущей странице есть блок для товаров — отрисовываем их
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
});

// Функция обновления цифры на кнопке корзины (работает на всех страницах шоурума)
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.length;
    }
}

// Добавление товара (вызывается по клику из каталога на главной)
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartBadge();
    showToast(`🛍️ ${name} добавлен в корзину!`);
}

// Красивое всплывающее уведомление на главной странице
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

// Отрисовка элементов на отдельной странице cart.html
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

// Функция удаления товара (работает прямо на странице cart.html)
function removeFromCart(index) {
    cart.splice(index, 1); // Удаляем вещь из массива по индексу
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленный список
    
    updateCartBadge(); // Обновляем счетчик в шапке страницы
    renderCartPage();  // Моментально перерисовываем страницу корзины
}

// Кнопка оплаты
function checkout() {
    if (cart.length === 0) {
        alert("Нельзя оплатить пустую корзину!");
        return;
    }
    alert("Переход к эквайрингу. Сумма к оплате: " + document.getElementById('total-price').innerText + "₽");
}