
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Function to render lists with templates
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Keep the previous function available for earlier activities
export function renderWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  renderListWithTemplate(template, parentElement, list, position, clear);
}

// Update the number of items in the cart
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.querySelector("#cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = cartItems.length;
  }
}
