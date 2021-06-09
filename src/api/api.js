import axios from "axios";

const baseURL = "/api";

const apiClient = axios.create({
  baseURL: baseURL,
});

export default apiClient;
