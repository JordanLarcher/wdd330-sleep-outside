const baseURL = import.meta.env.VITE_SERVER_URL;

// Converts a fetch response to JSON if the response is ok, otherwise throws an error
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

  export default class ProductData {

    constructor() {
    }
  

    // Fetches all products from the server and returns them as an array of objects
    async getData(category) {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
    return data.Result;
    }

    async findProductById(id) {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    }
    
    //   async findProductById(id) {
    //   const products = await this.getData();
    //   return products.find((item) => item.Id === id);
    // }

  }
  
  


  // Fetches a product by its ID from the server and returns it as an object
 

 

