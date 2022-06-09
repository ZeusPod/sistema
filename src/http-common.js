import axios from "axios";
export default axios.create({
  baseURL: "https://retrobar.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});
