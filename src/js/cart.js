import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const shoppingCart = new ShoppingCart();

async function init() {
  await loadHeaderFooter();
  updateCartCount();
  shoppingCart.renderCartContents();
}

init();