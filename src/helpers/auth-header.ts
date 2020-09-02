import { AUTH_DETAILS } from '../constants/common.constants';

export const getAuthDetails = () => {
    let authDetails = null;
    if (sessionStorage.getItem(AUTH_DETAILS))
       authDetails = JSON.parse(sessionStorage.getItem(AUTH_DETAILS) || "");
    return authDetails;
}

export const authHeader = () => {
  let authDetails = getAuthDetails();
  if (authDetails && authDetails.jwt) {
    return {
      "X-Access-Token": `${authDetails.jwt}`,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}