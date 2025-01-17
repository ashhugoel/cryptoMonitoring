import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Default baseURL for the CoinGecko API
  headers: {
    'Content-Type': 'application/json',
    'x_cg_demo_api_key': 'CG-cJWEMMbqgbu8hzYpsXCQSq9f', // Replace with your actual API key
  },
});

// Create a second instance for the local API
export const localApiInstance = axios.create({
  baseURL: '/localapi', // Proxy path for the local API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
