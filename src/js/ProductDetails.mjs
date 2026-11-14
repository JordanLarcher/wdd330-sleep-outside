import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId); // Fetch the product details based on the productId
        this.renderProductDetails(); // Render the product details on the page
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartContent = getLocalStorage("so-cart") || [];
        cartContent.push(this.product);
        setLocalStorage("so-cart", cartContent);
    }

    renderProductDetails() {
        const element = document.querySelector('main');
        element.innerHTML = productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
  // add discounted price if applicable
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
  );
  const discountHtml = isDiscounted
    ? `<div class="product-detail__discount">
         <span class="discount-badge">Save ${discountPercent}%  off</span>
         <p class="product-card__retail">Was: <s>$${product.SuggestedRetailPrice.toFixed(2)}</s></p>
       </div>`
    : "";

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    ${discountHtml}
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

