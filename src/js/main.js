import ProductData from "./productData.js"
import ProductList from "./ProductList.mjs"



const productData = new ProductData("tents");
const htmlElement = document.querySelector(".product-list")
const productList=new ProductList("Tents", productData, htmlElement);
productList.init();