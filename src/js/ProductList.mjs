import { renderListWithTemplate} from "./utils.mjs";


// Generates the HTML for a single product card using the provided product data.

function productCardTemplate(product) {
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


  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      ${discountHtml}
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

//Fetches the product data for the assigned category and triggers rendering to the page.
   
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

    // Fetches the product data for the assigned category and triggers rendering to the page.

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    // Renders the product list to the page using the provided template and list element.
    renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

}



