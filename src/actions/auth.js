import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  SET_MESSAGE,
} from "./types.js";

import AuthService from "../services/auth.service";

/**
 * A module that sends success and error response action for auth-related methods
 * @module actions/auth
 */

/**
 * User registration
 * success and error response action
 */
export const register =
  (
    email,
    username,
    password,
    firstname,
    middlename,
    lastname,
    address,
    birthday
  ) =>
  (dispatch) => {
    return AuthService.register(
      email,
      username,
      password,
      firstname,
      middlename,
      lastname,
      address,
      birthday
    ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        response.message = "User successfully registered";

        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

/**
 * User login
 * success and error response action
 */
export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data.data));
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      const data =
        (error.response && error.response.data) ||
        error.data ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      if (data.detail) {
        dispatch({
          type: SET_MESSAGE,
          payload: data.detail,
        });
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      }

      return Promise.reject();
    }
  );
};

/**
 * User update data
 * success and error response action
 */
export const updateUser =
  (
    user_id,
    nickname,
    civilStatus,
    birthPlace,
    height,
    weight,
    motherName,
    fatherName
  ) =>
  (dispatch) => {
    return AuthService.updateUser(
      user_id,
      nickname,
      civilStatus,
      birthPlace,
      height,
      weight,
      motherName,
      fatherName
    ).then(
      (data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data.data));
        }
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: data.data,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: data.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        const data =
          (error.response && error.response.data) ||
          error.data ||
          error.toString();

        if (data) {
          dispatch({
            type: SET_MESSAGE,
            payload: data.detail,
          });
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }

        return Promise.reject();
      }
    );
  };

/**
 * User logout action
 */
export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
