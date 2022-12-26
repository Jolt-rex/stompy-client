import http from './httpService';
import jwtDecode from 'jwt-decode';
const config = require('../config/default.json');

const apiEndpoint = `${config.apiEndPoint}/auth`;
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login({ email, password }) {
  const { data: jwt } = await http.post(apiEndpoint + "/login", { email, password });
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  http.clearJwt();
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) return null;
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = { login, loginWithJwt, logout, getCurrentUser };

export default auth;
