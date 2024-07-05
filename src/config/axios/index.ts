import axios from 'axios';
import {API_URL} from '../api-url';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use(response => response);

export default instance;
