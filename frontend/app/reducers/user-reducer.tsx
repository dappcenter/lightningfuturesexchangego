import typeToReducer from 'type-to-reducer';
import { Store } from '@/types';
import { UserActions } from '@/actions/user-actions';
import { getCookie } from '@/helpers/cookie-helper';

export interface LoggedInUser {
  isLoggedIn: boolean;
}

export interface UserState {
  loggedInUser: LoggedInUser
}

const userInitialState: UserState = {
  loggedInUser: {
    isLoggedIn: !!getCookie('jwt'),
  }
};

export const userReducer = typeToReducer({
  [UserActions.LOGIN_SUCCESS]: (state: Store, action) => ({
    ...state,
    loggedInUser: {
      isLoggedIn: true
    }
  }),
  [UserActions.LOG_OUT]: (state: Store) => ({
    ...state,
    loggedInUser: {
      isLoggedIn: false,
    }
  }),
}, userInitialState);