import { updateCartCount } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        updateCartCount();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
        cartItems.push(this.product);
        localStorage.setItem('so-cart', JSON.stringify(cartItems));
        updateCartCount();
    }

    addToCart() {
        this.addProductToCart();
    }

    renderProductDetails() {
        document.getElementById('product-brand').textContent =
            this.product.Brand.Name;

        document.getElementById('product-name').textContent =
            this.product.NameWithoutBrand;

        const productImage = document.getElementById('product-image');
        productImage.src = `/${this.product.Image}`;
        productImage.alt = this.product.Name;

        document.getElementById('product-price').textContent =
            `$${this.product.FinalPrice}`;

        document.getElementById('product-color').textContent =
            this.product.Colors[0].ColorName;

        document.getElementById('product-description').innerHTML =
            this.product.DescriptionHtmlSimple;

        document.getElementById('addToCart').dataset.id = this.product.Id;
    }
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }