import axios from "axios";
import { API_URL } from "./url";

const signUp = (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

const signIn = (data) => {
  return axios.post(`${API_URL}/auth/login`, data).then((res) => {
    if (res.data.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
    }
    return res.data;
  });
};

const signOut = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  signUp,
  signIn,
  signOut,
};

export default AuthService;
