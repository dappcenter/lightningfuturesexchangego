import { setCookie } from "./cookie-helper";
import Axios from "axios";
import { UserActions } from "@/actions";

export const setupAxios = (appStore) => {
  Axios.interceptors.response.use(function (response) {
    if (response.data.token) {
      setCookie('jwt', response.data.token, 1);
    }
    return response;
  }, function (error) {
    if (401 === error.response.status) {
      appStore.dispatch(UserActions.logout());
    }
  });
}