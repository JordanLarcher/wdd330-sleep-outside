import CheckoutProcess from "./CheckoutProcess.mjs";
import { updateCartCount } from "./utils.mjs";

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();
updateCartCount();

// When user finishes typing zip, calculate tax + shipping + total
document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});