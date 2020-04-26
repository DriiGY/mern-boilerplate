import axios from "axios";
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(
      "/api/users/login",
      dataToSubmit /*, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        withCredentials: true,
      },
    }*/
    )
    .then((response) => response.data)
    .catch((error) => error.response);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(
      "/api/users/register",
      dataToSubmit /* {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      },
    }*/
    )
    .then((response) => response.data)
    .catch((error) => error.response);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(
      "/api/users/logout" /* {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      },
    }*/
    )
    .then((response) => response.data)
    .catch((error) => error.response);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data)
    .catch((error) => error.response);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
