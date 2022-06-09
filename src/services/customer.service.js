import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./url";

const createCustomer = (data) => {
  return axios.post(API_URL + "/client", data, { headers: authHeader() });
};

const updateCustomer = (data) => {
  return axios.put(API_URL + `/client/${data.id}`, data, {
    headers: authHeader(),
  });
};

const deleteCustomer = (id) => {
  return axios.delete(API_URL + `/client/${id}`, { headers: authHeader() });
};

const getCustomerById = (id) => {
  return axios.get(API_URL + `/client/${id}`, { headers: authHeader() });
};

const getCustomers = () => {
  return axios.get(API_URL + "/client", { headers: authHeader() });
};

const getPaginatedCustomer = (column, page, limit, search) => {
  return axios.get(
    API_URL +
      `/client/paginated?page=${page}&limit=${limit}&search=${search}&column=${column}`,
    { headers: authHeader() }
  );
};

const customerService = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  getPaginatedCustomer,
};

export default customerService;
