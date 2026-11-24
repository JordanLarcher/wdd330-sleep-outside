import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// ProductDetails class is responsible for fetching and rendering the details of a specific product based on its ID. It also handles adding the product to the shopping cart.
export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // Initializes the ProductDetails instance by fetching the product details based on the productId, rendering the product details on the page, and setting up an event listener for adding the product to the cart.
    async init() {
        this.product = await this.dataSource.findProductById(this.productId); 
        this.renderProductDetails(); 
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }

    // Adds the current product to the shopping cart stored in local storage. If the cart is empty, it initializes it as an empty array before adding the product.

    addProductToCart() {
        const cartContent = getLocalStorage("so-cart") || [];
        cartContent.push(this.product);
        setLocalStorage("so-cart", cartContent);
    }

    // Renders the product details on the page by selecting the main element and setting its innerHTML to the output of the productDetailsTemplate function, which generates the HTML for the product details based on the product data.

    renderProductDetails() {
        const element = document.querySelector('main');
        element.innerHTML = productDetailsTemplate(this.product);
    }
}


// Generates the HTML for the product details based on the provided product data. It includes the product's brand, name, image, price, color, description, and an "Add to Cart" button. If the product is discounted, it also displays the discount percentage and the original price.

function productDetailsTemplate(product) {
  // add discounted price if applicable
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
  );
  const discountHtml = isDiscounted
    ? `<div class="product-detail__discount">
     <p class="product-card__retail">Was: <s>$${product.SuggestedRetailPrice.toFixed(2)}</s></p>
         <span class="discount-badge">Save ${discountPercent}%  off</span>
       </div>`
    : "";

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}"/>
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

