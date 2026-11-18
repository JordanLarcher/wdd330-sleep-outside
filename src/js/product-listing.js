import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);
listing.init();

// Update the page title to match the category
// "sleeping-bags" -> "Sleeping Bags", "tents" -> "Tents"
const title = category
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
document.querySelector(".title").textContent = `Top Products: ${title}`;