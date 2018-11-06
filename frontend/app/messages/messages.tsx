import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_fr from 'react-intl/locale-data/fr';

import messages_en from '../../i18n/en.json';
import messages_fr from "../../i18n/fr.json";

export const messages = {
  'en': messages_en,
  'fr': messages_fr
};

addLocaleData([...locale_en, ...locale_fr]);