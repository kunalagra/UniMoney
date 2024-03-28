import axios from "axios";
const url = "https://unimoney-backend.onrender.com/";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default axios.create({
  withCredentials: true,
  accessControlAllowCredentials: true,
  credientials: "same-origin",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + await AsyncStorage.getItem('token')
  },
  baseURL: url
});

