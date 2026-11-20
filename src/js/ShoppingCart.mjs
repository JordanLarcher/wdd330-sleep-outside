import { getLocalStorage } from './utils.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart{

    renderCartContents() {
    const cartItems = getLocalStorage('so-cart') || [];
    const productList = document.querySelector('.product-list');
    if (cartItems.length === 0) {
        productList.innerHTML = `<li class="cart-empty"><p>Your cart is empty.</p><p><a href="../index.html">Continue shopping</a> to add items to your cart.</p></li>`;
        return;
    }
    renderListWithTemplate((item) => this.cartItemTemplate(item), productList, cartItems, 'afterbegin', true);
    this.renderCartTotal(cartItems);
    }

    renderCartTotal(cartItems) {
        const cartFooter = document.querySelector('.cart-footer');
        const cartTotal = document.querySelector('.cart-total');
        const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
        cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        cartFooter.classList.remove('hide');
    }

    cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
        <img
        src="${item.Image}"
        alt="${item.Name}"
        />
    </a>
    <a href="#">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <div data-id="${item.Id}" class="cart-card__remove">X</div>
    </li>`;

    return newItem;
    }

}