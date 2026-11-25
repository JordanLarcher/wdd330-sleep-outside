import { getParam, loadHeaderFooter, updateCartCount } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
(async () => {
  await loadHeaderFooter();
  updateCartCount();
})();
const productId = getParam('product');
const dataSource = new ExternalServices('tents');

const product = new ProductDetails(productId, dataSource);

product.init();
loadHeaderFooter();
