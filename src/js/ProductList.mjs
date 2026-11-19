import { renderListWithTemplate } from './utils.mjs'


export function productCardTemplate(product){
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
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
        this.sortBy = "name-asc";
    }

    async init() {
        const list = await this.dataSource.getData();
        this.products = list;
        this.renderList(this.getSortedList());
        this.initSort();
    }
  }

  sortProducts(sortBy) {
    const sortedProducts = [...this.list];

    initSort() {
        const sortSelect = document.getElementById("sort");
        if (!sortSelect) return;
        sortSelect.addEventListener("change", (e) => {
            this.sortBy = e.target.value;
            this.renderList(this.getSortedList());
        });
    }

    getSortedList() {
        const sorted = [...this.products];
        if (this.sortBy === "name-asc") {
            return sorted.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        }
        if (this.sortBy === "name-desc") {
            return sorted.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
        }
        if (this.sortBy === "price-asc") {
            return sorted.sort((a, b) => Number(a.FinalPrice) - Number(b.FinalPrice));
        }
        if (this.sortBy === "price-desc") {
            return sorted.sort((a, b) => Number(b.FinalPrice) - Number(a.FinalPrice));
        }
        return sorted;
    }

    renderList(productList) {
        this.listElement.innerHTML = "";
        renderWithTemplate(productCardTemplate, this.listElement, productList)
    }

    this.renderList(sortedProducts);
  }

  renderList(productList) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      productList,
      'afterbegin',
      true
    );
  }
}