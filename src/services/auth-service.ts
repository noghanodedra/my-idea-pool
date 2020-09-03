import API from '../api';
import { TokenStorage } from './token-storage-service';

const RESOURCE_NAME = "/access-tokens";

const refreshToken = async (refreshToken: string) => {
    return await API.post(`${RESOURCE_NAME}/refresh`, {
      refresh_token: refreshToken,
    });
}

const login = async (email: string, password: string) => {
  return await API.post(`${RESOURCE_NAME}`, {
    email,
    password,
  });
};

const logout = async (refreshToken: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": `${TokenStorage.getToken()}`,
    },
    body: JSON.stringify({ "refresh_token": refreshToken }),
  };
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}${RESOURCE_NAME}`,
    options
  );
  TokenStorage.clear();
  return response;
};

export const authService = {
  login,
  logout,
  refreshToken,
};