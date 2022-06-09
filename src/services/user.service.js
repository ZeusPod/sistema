import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./url";

const createUser = (data) => {
  return axios.post(API_URL + "/auth/register", data, {
    headers: authHeader(),
  });
};

const updateUser = (data) => {
  return axios.put(API_URL + `/user/${data.id}`, data, {
    headers: authHeader(),
  });
};

const desactiveUser = (id) => {
  return axios.put(API_URL + `/user/desactive/${id}`, {
    headers: authHeader(),
  });
};

const activeUser = (id) => {
  return axios.put(API_URL + `/user/active/${id}`, {
    headers: authHeader(),
  });
};

const getPaginatedUser = (column, page, limit, search) => {
  return axios.get(
    API_URL +
      `/user/paginated?page=${page}&limit=${limit}&search=${search}&column=${column}`,
    { headers: authHeader() }
  );
};

const userService = {
  createUser,
  updateUser,
  activeUser,
  desactiveUser,
  getPaginatedUser,
};

export default userService;
