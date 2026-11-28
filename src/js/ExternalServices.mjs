const baseUrl = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() { }
  async getData(category) {
    const response = await fetch(`${baseUrl}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseUrl}product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(
      'https://wdd330-backend-osp8.onrender.com/checkout',
      options
    );

    console.log('Checkout HTTP status:', response.status);

    const responseBody = await response.clone().text();
    console.log('Checkout response body:', responseBody);

    return await convertToJson(response);
  }
}