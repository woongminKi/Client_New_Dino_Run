import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  const cookie = cookies.set(name, value, { ...option });
  return cookie;
};

export const getCookie = (name) => {
  const cookie = cookies.get(name);
  return cookie;
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
