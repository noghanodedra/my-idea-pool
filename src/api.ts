import axios from 'axios';
import { authHeader } from 'helpers/auth-header';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  timeout: parseInt(`${process.env.REACT_APP_TIMEOUT_MS}`) || 600000,
  headers: authHeader(),
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err.response);
    throw new Error(err);
  }
);

export default client;