
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, updateCartCount, loadHeaderFooter } from './utils.mjs';


(async () => {
  await loadHeaderFooter();
  updateCartCount();
})();

const category = getParam('category');
const categoryName = category
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

document.querySelector('.products h2').textContent =
  `Top Products: ${categoryName}`;
const dataSource = new ExternalServices();
const htmlElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, htmlElement);
productList.init();
