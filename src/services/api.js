import axios from "axios";
 const API_BASE_URL= "https://restcountries.com/v3.1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  
});

export default apiClient