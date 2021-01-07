import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const userKey = "user";

export async function login(username: string, password: string) {
  const { data } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(userKey, data);
}

export function logout() {
  localStorage.removeItem(userKey);
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem(userKey);
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
