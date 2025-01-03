import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiService = {
  getDrugs: () => axios.get(`${API_BASE_URL}/drugs`),
  getSales: () => axios.get(`${API_BASE_URL}/sales`),
  getInventory: () => axios.get(`${API_BASE_URL}/inventory`),
  getSellerPerformance: () => axios.get(`${API_BASE_URL}/seller-performance`),
};

export default apiService;
