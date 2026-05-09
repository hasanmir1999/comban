import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lotexev.ir/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
