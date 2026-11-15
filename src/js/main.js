import { updateCartCount, loadHeaderFooter } from './utils.mjs';


(async () => {
  await loadHeaderFooter();
  updateCartCount();
})();