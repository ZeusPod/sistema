import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./url";

const createInvoice = (data) => {
  return axios.post(API_URL + "/invoice", data, { headers: authHeader() });
};

const getPaginatedInvoices = (column, page, limit, search) => {
  return axios.get(
    API_URL +
      `/invoice/paginated?page=${page}&limit=${limit}&search=${search}&column=${column}`,
    { headers: authHeader() }
  );
};

const getInvoicesByIdClientPending = (id, column, page, limit, search) => {
  return axios.get(
    API_URL +
      `/invoice/client/${id}?page=${page}&limit=${limit}&search=${search}&column=${column}&status=Pending`,
    { headers: authHeader() }
  );
};

const getInvoicesByIdClientSuccess = (id, column, page, limit, search) => {
  return axios.get(
    API_URL +
      `/invoice/client/${id}?page=${page}&limit=${limit}&search=${search}&column=${column}&status=Success`,
    { headers: authHeader() }
  );
};

const updateInvoiceById = (id, products, amount, status) => {
  return axios.put(
    API_URL + `/invoice/${id}`,
    { products, status, amount },
    { headers: authHeader() }
  );
};

const invoiceService = {
  createInvoice,
  getPaginatedInvoices,
  getInvoicesByIdClientPending,
  getInvoicesByIdClientSuccess,
  updateInvoiceById,
};

export default invoiceService;
