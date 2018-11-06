import { setCookie, getCookie } from "@/helpers/cookie-helper";

/**
* USER HANDLER
*/
export module UserActions {
  export const USER_HANDLER_NAME = 'user-handler';

  export const LOGIN_SUCCESS = `${USER_HANDLER_NAME}/LOGIN_SUCCESS`;
  export const LOG_OUT = `${USER_HANDLER_NAME}/LOG_OUT`;

  export const loginSuccess = () => (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
      },
    });
  }

  export const logout = () => (dispatch) => {
    setCookie('jwt', null, -1);    
    dispatch({
      type: LOG_OUT,
    });
  }
}