import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default customFetch;
