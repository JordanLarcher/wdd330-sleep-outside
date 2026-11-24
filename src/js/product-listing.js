import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

productList.init();



// Updates the page title based on the category parameter in the URL. It selects the h2 element within the .products class and sets its text content to "Top Products: [Category]", where [Category] is formatted with each word capitalized.

const titleElement = document.querySelector(".products h2");
if (titleElement && category) {
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  titleElement.textContent = `Top Products: ${formattedCategory}`;
}