
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const productData = new ProductData("tents");
const htmlElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, htmlElement);

productList.init();

updateCartCount();
