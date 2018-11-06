import { Store } from "./types";

export module Selectors {
  export const getCurrentLocale = (state: Store) => {
    return state.app.current_locale;
  }

  export const getIsLoggedIn = (state: Store) => {
    return state.app.loggedInUser.isLoggedIn;
  }
}