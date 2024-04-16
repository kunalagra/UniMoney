import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "https://unimoney-backend.onrender.com/";

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  accessControlAllowCredentials: true,
  credentials: "same-origin",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
