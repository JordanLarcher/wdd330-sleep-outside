import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs"
import { updateCartCount } from "./utils.mjs";


const dataSource = new ExternalServices("tents");
const htmlElement = document.querySelector(".product-list")
const productList = new ProductList("Tents", dataSource, htmlElement);
productList.init();

updateCartCount();