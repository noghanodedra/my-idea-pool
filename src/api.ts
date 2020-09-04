import axios from 'axios';
import { InfoDialog } from 'components/InfoDialog';
import { AUTHORIZATION_HEADER_NAME } from 'constants/common.constants';
import { authService } from 'services/auth-service';
import { TokenStorage } from 'services/token-storage-service';

const DEFAULT_TIMEOUT_MS = 600000;

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  timeout:
    parseInt(`${process.env.REACT_APP_TIMEOUT_MS}`) || DEFAULT_TIMEOUT_MS,
  headers: TokenStorage.getAuthentication(),
});

const refreshTokenEndPoint = `${process.env.REACT_APP_API_ENDPOINT}/refresh`;

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status !== 401) {
      InfoDialog(error.response.data.reason);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === refreshTokenEndPoint
    ) {
      // eslint-disable-next-line no-restricted-globals
      location.replace("/");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = TokenStorage.getRefreshToken() || "";
      const res = await authService.refreshToken(refreshToken);
      if (res.status === 200) {
        TokenStorage.storeToken(res.data.jwt);
        axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = +res.data
          .jwt;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
