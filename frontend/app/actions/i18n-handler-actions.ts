import { setCookie } from "@/helpers/cookie-helper";

/**
* I18N HANDLER
*/
export module I18nHandlerActions {
  export const I18N_HANDLER_NAME = 'core-i18n-handler';

  export const LOCALE_CHANGE = `${I18N_HANDLER_NAME}/LOCALE_CHANGE`;

  export const changeLocale = (locale) => (dispatch) => {
    setCookie('locale', locale, 1000);
    dispatch({
      type: LOCALE_CHANGE,
      payload: {
        locale,
      },
    });
  };
}