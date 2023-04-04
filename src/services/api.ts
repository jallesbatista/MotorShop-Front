import axios from "axios";

const localUrl = "http://localhost:3099";
const api = axios.create({
  baseURL: localUrl,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default api;
