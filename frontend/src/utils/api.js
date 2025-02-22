import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});


// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log('UserInfo:', userInfo);
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
    console.log('Added Authorization:', config.headers.Authorization);
  }
  return config;
});
// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
  
  // Add response logging
  api.interceptors.response.use(response => {
    console.log('API Response:', response);
    return response;
  }, error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  });

export default api;

// import axios from 'axios';



