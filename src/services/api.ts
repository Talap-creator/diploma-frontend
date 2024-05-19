import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('http://localhost:8000/ecoMarket/product-list/');
  console.log(response.data);
  return response.data;
}
