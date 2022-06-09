import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./url";

const createProduct = (data) => {
  return axios.post(API_URL + "/product", data, { headers: authHeader() });
};

const updateProduct = (data) => {
  return axios.put(API_URL + `/product/${data.id}`, data, {
    headers: authHeader(),
  });
};

const deleteProduct = (id) => {
  return axios.delete(API_URL + `/product/${id}`, { headers: authHeader() });
};

const getProductById = (id) => {
  return axios.get(API_URL + `/product/${id}`, { headers: authHeader() });
};

const getProducts = () => {
  return axios.get(API_URL + "/product", { headers: authHeader() });
};

const getPaginatedProduct = (column, page, limit, search) => {
  return axios.get(
    API_URL +
      `/product/paginated?page=${page}&limit=${limit}&search=${search}&column=${column}`,
    { headers: authHeader() }
  );
};

const productService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getPaginatedProduct,
};

export default productService;
