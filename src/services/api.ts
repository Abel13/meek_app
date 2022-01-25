import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'http://10.0.2.2:8080',
  // baseURL: 'https://192.168.100.23:8080',
  baseURL: "https://powerful-sierra-52689.herokuapp.com",
});

export default api;
