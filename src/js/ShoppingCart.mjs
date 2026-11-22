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
                const quantityControl = event.target.closest('.cart-card__quantity-btn');
                if (!removeControl && !quantityControl) return;
                if (removeControl) {
                    this.removeItem(removeControl.dataset.id);
                } else if (quantityControl) {
                    const action = quantityControl.dataset.action;
                    const itemId = quantityControl.dataset.id;
                    if (action === 'increase') {
                        this.increaseQuantity(itemId);
                    } else if (action === 'decrease') {
                        this.decreaseQuantity(itemId);
                    }
                }
                this.renderCartContents();
                updateCartCount();
            });
        }
    }

    removeItem(itemId) {
        const itemIndex = this.cartItems.findIndex(item => String(item.Id) === String(itemId));
        if (itemIndex  !== -1) {
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
        const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice) * item.Quantity, 0);
        this.cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        this.cartFooter.classList.remove('hide');
    }
    increaseQuantity(itemId) {
        const item = this.cartItems.find(item => String(item.Id) === String(itemId));
        if (item) {
            item.Quantity += 1;
            setLocalStorage('so-cart', this.cartItems);
        }
    }

    decreaseQuantity(itemId) {
        const item = this.cartItems.find(item => String(item.Id) === String(itemId));
        if (item) {
            item.Quantity -= 1;
            if (item.Quantity <= 0) {
                this.removeItem(itemId);
            } else {
                setLocalStorage('so-cart', this.cartItems);
            }  
        }
    };
    cartItemTemplate(item) {
        const newItem = `<li class="cart-card divider">
            <a href="#" class="cart-card__image">
                <img
                src="${item.PrimaryMedium}"
                alt="${item.Name}"
                />
            </a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <button class="cart-card__quantity-btn" data-action="increase" data-id="${item.Id}">+</button>
            <p class="cart-card__quantity">qty: ${item.Quantity}</p>
            <button class="cart-card__quantity-btn" data-action="decrease" data-id="${item.Id}">-</button>
            <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
            <button type="button" class="cart-card__remove" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
            </li>`;

        return newItem;
    };

}