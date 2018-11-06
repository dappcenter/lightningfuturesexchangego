import React from 'react';
import { Route, Redirect } from 'react-router';
import { MasterLayout } from '@/components/layouts/master/master-layout';
import { commonMessages } from '@/messages/common-messages';
import { RegisterForm } from './register-form/register-form';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { PaperForm } from '@/components/widgets/common/paper-form';
import { connect } from 'react-redux';
import { Selectors } from '@/selectors';

interface ConnectedProps {
  isLoggedIn: boolean;
}

const mapStateToProps = (state) => ({
  isLoggedIn: Selectors.getIsLoggedIn(state)
})

class RegisterPageBase extends React.PureComponent<ConnectedProps> {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <MasterLayout title={<FormattedMessage {...commonMessages.registerPage} />}>
        <PaperForm>
          <RegisterForm />
        </PaperForm>
      </MasterLayout>
    );
  }
}

export const RegisterPage = connect(mapStateToProps)(RegisterPageBase);

export const RegisterPageRoute = (
  <Route key="register-page" path="/register" exact component={RegisterPage} />
);