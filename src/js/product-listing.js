
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, updateCartCount, loadHeaderFooter } from './utils.mjs';


(async () => {
  await loadHeaderFooter();
  updateCartCount();
})();

const category = getParam('category');
const productData = new ProductData();
const htmlElement = document.querySelector('.product-list')
const productList = new ProductList(category, productData, htmlElement);
productList.init();