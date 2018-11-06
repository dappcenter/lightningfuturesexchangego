import { I18nHandlerActions } from '@/actions';
import typeToReducer from 'type-to-reducer';
import { Store } from '@/types';
import { getCookie } from '@/helpers/cookie-helper';

export interface i18nState {
  current_locale: string;
}

const i18nInitialState = {
  current_locale: getCookie('locale') || 'en'
};

export const i18nReducer = typeToReducer({
  [I18nHandlerActions.LOCALE_CHANGE]: (state: Store, action) => ({
    ...state,
    current_locale: action.payload.locale,
  }),
}, i18nInitialState);