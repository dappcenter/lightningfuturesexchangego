/* global process */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as FormattedMessageIntl } from 'react-intl';
import { Selectors } from '@/selectors';

import messages_en from '../../../../i18n/en.json';
import messages_fr from "../../../../i18n/fr.json";

const messages = {
  'en': messages_en,
  'fr': messages_fr
};

interface ConnectedProps {
  current_locale: string;
}

const mapStateToProps = (state) => ({
  current_locale: Selectors.getCurrentLocale(state),
});

class FormattedMessageBase extends React.PureComponent<ConnectedProps & FormattedMessageIntl.MessageDescriptor> {
  render() {
    const { current_locale, id, defaultMessage } = this.props;
    return _.get(messages[current_locale], id, defaultMessage)
  }
}

export const FormattedMessage = connect(mapStateToProps)(FormattedMessageBase);