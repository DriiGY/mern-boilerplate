import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTH_USER,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSucess: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerSucess: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        logoutSucess: action.payload,
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
