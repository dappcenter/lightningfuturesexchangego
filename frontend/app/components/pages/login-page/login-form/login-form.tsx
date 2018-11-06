import React from 'react';
import { Field, reduxForm, InjectedFormProps, Form, SubmissionError } from 'redux-form';
import { TextField } from '@/components/widgets/form/text-field';
import { commonMessages } from '@/messages/common-messages';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { UsernamePassword } from '@/types';
import { validationMessages } from '@/messages/validation-messages';
import Axios from 'axios';
import { CenteredButton } from '@/components/widgets/common/centered-button';
import { FormWrapper } from '@/components/widgets/common/form-wrapper';
import { validatUsername, validatePassword, validateTwoFactorAuthenticationCode } from '@/helpers/validators';
import { connect } from 'react-redux';
import { UserActions } from '@/actions';

interface LoginForm extends UsernamePassword {
  twoFactorAuthenticationCode: string;
}

const validate = (loginForm: LoginForm) => {
  const errors: any = {
    username: null,
    password: null,
    twoFactorAuthenticationCode: null
  }

  validatUsername(loginForm, errors);
  validatePassword(loginForm, errors);
  validateTwoFactorAuthenticationCode(loginForm, errors);

  return errors
}

interface DispatchProps {
  loginSuccess(): void;
}

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: () => dispatch(UserActions.loginSuccess())
});

class LoginFormBase extends React.PureComponent<DispatchProps & InjectedFormProps<LoginForm>> {
  submit = () => async(loginForm: LoginForm) => {
    return Axios.post('/api/login', loginForm)
      .then(() => {
        this.props.loginSuccess();
      })
      .catch((res) => {
        if (res.response.status === 401) {
          if (res.response.data.message === 'IncorrectPassword') {
            throw new SubmissionError({
              _error: <FormattedMessage {...validationMessages.incorrectPassword} />,
            });
          } else if (res.response.data.message === 'UsernameNotFound') {
            throw new SubmissionError({
              _error: <FormattedMessage {...validationMessages.usernameNotFound} />,
            });
          }
        }
        throw new SubmissionError({
          _error: <FormattedMessage {...validationMessages.unknownError} />,
        })
      })
  };

  render () {
    const { handleSubmit, pristine, submitting, error, submitSucceeded } = this.props;

    return (
      <FormWrapper>
        <Form onSubmit={handleSubmit(this.submit())}>
          <Field
            name="username"
            component={TextField}
            label={<FormattedMessage {...commonMessages.username} />}
            disabled={submitting}
          />
          <Field
            name="password"
            type="password"
            component={TextField}
            label={<FormattedMessage {...commonMessages.password} />}
            disabled={submitting}
          />
          <Field
            name="twoFactorAuthenticationCode"
            type="number"
            component={TextField}
            label={<FormattedMessage {...commonMessages.twoFactorAuthenticationCode} />}
            disabled={submitting}
          />
          <CenteredButton variant="contained" color="primary" type="submit" disabled={pristine || submitting} fullWidth={false} >
            <FormattedMessage {...commonMessages.login} />
          </CenteredButton>
          {error && <b><strong><Typography variant='body1' color='error'>{error}</Typography></strong></b>}
        </Form>
      </FormWrapper>
    );
  }
}

const ConnectedComponent = connect(null, mapDispatchToProps)(LoginFormBase);
export const LoginForm = reduxForm({
  form: 'login',
  validate,
})(ConnectedComponent)
