import { LoggedInUser, UserState } from "./reducers/user-reducer";
import { i18nState } from "./reducers/i18n-reducer";

export interface App extends UserState, i18nState {
}

export interface Store {
  app: App;
};

export enum APIStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface APIState {
  status: APIStatus;
  error: string;
}

export interface UsernamePassword {
  username: string;
  password: string;
}