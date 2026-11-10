import {renderWithTemplate } from "./utils.mjs"
export function productCardTemplate(product){
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);

    const sortSelect = document.querySelector('#product-sort');

    if (sortSelect) {
      sortSelect.addEventListener('change', (event) => {
        this.sortProducts(event.target.value);
      });
    }
  }

  sortProducts(sortBy) {
    const sortedProducts = [...this.products];

    switch (sortBy) {
      case 'name-asc':
        sortedProducts.sort((a, b) =>
          a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
        );
        break;

      case 'name-desc':
        sortedProducts.sort((a, b) =>
          b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
        );
        break;

      case 'price-asc':
        sortedProducts.sort(
          (a, b) => Number(a.FinalPrice) - Number(b.FinalPrice)
        );
        break;

      case 'price-desc':
        sortedProducts.sort(
          (a, b) => Number(b.FinalPrice) - Number(a.FinalPrice)
        );
        break;

      default:
        break;
    }

    this.renderList(sortedProducts);
  }

  renderList(productList) {
    renderWithTemplate(
      productCardTemplate,
      this.listElement,
      productList,
      'afterbegin',
      true
    );
  }
}