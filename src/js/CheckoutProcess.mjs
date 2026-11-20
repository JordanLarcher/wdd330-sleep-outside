import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // Add up FinalPrice for everything in the cart
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    const numItems = this.list.length;

    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    const numItemsEl = document.querySelector(`${this.outputSelector} #num-items`);
    if (subtotalEl) subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (numItemsEl) numItemsEl.innerText = numItems;
  }

  calculateOrderTotal() {
    // Tax: 6% of subtotal
    this.tax = this.itemTotal * 0.06;
    // Shipping: $10 for first item + $2 for each additional
    const numItems = this.list.length;
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotalEl = document.querySelector(`${this.outputSelector} #orderTotal`);
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (orderTotalEl) orderTotalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
  async checkout(form) {
    const json = formDataToJSON(form);
    // Make sure totals are up to date
    this.calculateOrderTotal();
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
     try {
    const res = await this.services.checkout(json);
    console.log(res);
    // Happy Path: clear cart + go to success page
    localStorage.removeItem(this.key);
    location.assign("/checkout/success.html");
   } catch (err) {
    console.log(err);
    // Unhappy Path: stay on form, show the server's message
    document.querySelectorAll(".alert").forEach((a) => a.remove());
    let message = "There was a problem with your order. Please try again.";
    if (err.message) {
      if (typeof err.message === "string") {
        message = err.message;
            } else if (err.message.message) {
        message = err.message.message;
      } else if (typeof err.message === "object") {
        // Server sends { "expiration": "Card expired" } etc.
        message = Object.values(err.message).join(" ");
      } else {
        message = JSON.stringify(err.message);
      }
    }
    alertMessage(message);
  }
  }
}