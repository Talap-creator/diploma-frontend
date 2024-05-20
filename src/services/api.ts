import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-list/');
  console.log(response.data);
  return response.data;
}
