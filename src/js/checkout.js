import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import ExternalServices from './ExternalServices.mjs';

const dataSource = new ExternalServices();

const checkout = new CheckoutProcess(
  'so-cart',
  '.order-summary',
  dataSource
);

async function init() {
  await loadHeaderFooter();
  updateCartCount();
  checkout.init();
  console.log('Checkout initiated.');
  const zipInput = document.querySelector('#zip');

  zipInput.addEventListener('change', () => {
    checkout.calculateOrderTotal();
  });
  const checkoutForm = document.querySelector('#checkout-form');

  checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const response = await checkout.checkout(checkoutForm);
      console.log('Checkout response:', response);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  });
}

init();