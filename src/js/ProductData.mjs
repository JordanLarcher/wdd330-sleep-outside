const baseUrl = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseUrl}products/search${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseUrl}product/${id}`);
    const product = await convertToJson(response);
    console.log(product.Result);
    return product.Result;
  }
}
