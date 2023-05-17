import axios from "axios";
import { parseCookies } from "nookies";

const { "ecommerce.token": token } = parseCookies();

const localUrl = "http://localhost:3099";
const deployUrl = "https://motorshop-api.onrender.com";
const api = axios.create({
  baseURL: deployUrl,
  timeout: 8000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;
