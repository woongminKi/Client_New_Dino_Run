import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  console.log("setCookie call", name, value, option);
  const cookie = cookies.set(name, value, { ...option });
  console.log("setCookie call22", { name, cookie });
  return cookie;
};

export const getCookie = (name) => {
  const cookie = cookies.get(name);
  console.log("getCookie call", { name, cookie });
  return cookie;
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
