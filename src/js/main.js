import ProductData from './ProductData.mjs'
import ProductList from './ProductList.mjs'
import { updateCartCount, loadHeaderFooter } from './utils.mjs';

(async () => {
  await loadHeaderFooter();
  updateCartCount();
})();
const productData = new ProductData('tents');
const htmlElement = document.querySelector('.product-list')
const productList = new ProductList('Tents', productData, htmlElement);
productList.init();