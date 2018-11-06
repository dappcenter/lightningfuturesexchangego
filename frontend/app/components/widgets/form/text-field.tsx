import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { WrappedFieldProps } from 'redux-form';
import { connect, DispatchProp } from 'react-redux';
import { Selectors } from '@/selectors';
import { FormattedMessage } from '../intl/formatted-message';

interface TextFieldProps extends WrappedFieldProps {
  label: React.ReactNode
}

interface ConnectedProps {
  current_locale: string;
}

const mapStateToProps = (state) => ({
  current_locale: Selectors.getCurrentLocale(state),
});

export class TextFieldBase extends React.PureComponent<TextFieldProps & ConnectedProps & DispatchProp> {
  render() {
    const {
      input,
      label,
      meta: { touched, error},
      dispatch,
      ...custom
    } = this.props;

    return (
      <MuiTextField
        label={label}
        error={touched && !!error}
        helperText={touched && error}
        {...input}
        {...custom}
      />
    );
  }
}

export const TextField = connect(mapStateToProps)(TextFieldBase);