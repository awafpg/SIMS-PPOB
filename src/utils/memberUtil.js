import { setCookie, getCookie } from "react-use-cookie";

export const setAuthToken = (token) => {
  setCookie("authToken", token, {
    days: 10,
  });
};

export const removeAuthToken = () => {
  setCookie("authToken", "", { days: 0 });
};

export const getAuthToken = () => {
  return getCookie("authToken");
};
