import React from 'react';
import { Field, reduxForm, InjectedFormProps, Form, SubmissionError } from 'redux-form';
import { TextField } from '@/components/widgets/form/text-field';
import { commonMessages } from '@/messages/common-messages';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { UsernamePassword } from '@/types';
import { validationMessages } from '@/messages/validation-messages';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { CenteredButton } from '@/components/widgets/common/centered-button';
import { FormWrapper } from '@/components/widgets/common/form-wrapper';
import { validatUsername, validatePassword, validateConfirmPassword } from '@/helpers/validators';

export interface UserRegisterForm extends UsernamePassword {
  confirmPassword: string;
}

const validate = (userRegister: UserRegisterForm) => {
  const errors: any = {
    username: null,
    password: null,
    confirmPassword: null
  }

  validatUsername(userRegister, errors);
  validatePassword(userRegister, errors);
  validateConfirmPassword(userRegister, errors);

  return errors
}

class RegisterFormBase extends React.Component<InjectedFormProps<UserRegisterForm>> {
    
  submit = async(userRegister: UsernamePassword) => {
    return Axios.post('/api/register', userRegister)
      .then((res) => {
      })
      .catch((res) => {
        if (res.response.status === 409) {
          throw new SubmissionError({
            _error: <FormattedMessage {...validationMessages.usernameAlreadyExists} />,
          })
        }
        throw new SubmissionError({
          _error: <FormattedMessage {...validationMessages.unknownError} />,
        })
      })
  };

  render () {
    const { handleSubmit, pristine, submitting, error, submitSucceeded } = this.props;

    if (submitSucceeded) {
      return <Redirect to='registersuccess' />
    }

    return (
      <FormWrapper>
        <Form onSubmit={handleSubmit(this.submit)}>
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
            name="confirmPassword"
            type="password"
            component={TextField}
            label={<FormattedMessage {...commonMessages.confirmPassword} />}
            disabled={submitting}
          />
          <CenteredButton variant="contained" color="primary" type="submit" disabled={pristine || submitting} fullWidth={false} >
            <FormattedMessage {...commonMessages.register} />
          </CenteredButton>
          {error && <b><strong><Typography variant='body1' color='error'>{error}</Typography></strong></b>}
        </Form>
      </FormWrapper>
    );
  }
}

export const RegisterForm = reduxForm({
  form: 'register',
  validate,
})(RegisterFormBase)
