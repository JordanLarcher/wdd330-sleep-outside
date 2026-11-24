import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

import { loadHeaderFooter } from "./utils.mjs";


// Fetches the product ID from the URL parameters, creates a ProductData instance for the "tents" category, and initializes a ProductDetails instance with the product ID and data source. Finally, it calls the init method to fetch and render the product details on the page.
const productId = getParam("product");
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();

// Loads the header and footer of the page.
loadHeaderFooter();

