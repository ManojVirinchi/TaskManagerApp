import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Talking to your backend
});

export default api;
