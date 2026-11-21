import { getLocalStorage, setLocalStorage, updateCartCount, renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart{
    
    constructor(){
        this.cartItems = getLocalStorage('so-cart') || [];
        this.productList = document.querySelector('.product-list');
        this.cartFooter = document.querySelector('.cart-footer');
        this.cartTotal = document.querySelector('.cart-total');

        if (this.productList) {
            this.productList.addEventListener('click', (event) => {
                const removeControl = event.target.closest('.cart-card__remove');
                if (!removeControl) return;
                this.removeItem(removeControl.dataset.id);
                this.renderCartContents();
                updateCartCount();
            });
        }
    }

    removeItem(itemId) {
        const itemIndex = this.cartItems.findIndex( item => String(item.Id) === String(itemId));
        if (itemIndex  !== 1) {
            this.cartItems.splice(itemIndex, 1);
        }
        setLocalStorage('so-cart', this.cartItems);
    }
    renderCartContents() {

        if (this.cartItems.length === 0) {
            this.productList.innerHTML = `<li class="cart-empty"><p>Your cart is empty.</p><p><a href="../index.html">Continue shopping</a> to add items to your cart.</p></li>`;
            this.cartFooter.classList.add('hide');
            return;
        }
        renderListWithTemplate((item) => this.cartItemTemplate(item), this.productList, this.cartItems, 'afterbegin', true);
        this.renderCartTotal(this.cartItems);
    }

    renderCartTotal(cartItems) {
        const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
        this.cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        this.cartFooter.classList.remove('hide');
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
        <button type="button" class="cart-card__remove" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
        </li>`;

        return newItem;
    }

}