import React from 'react';
import { Route, Redirect } from 'react-router';

import { MasterLayout } from '@/components/layouts/master/master-layout';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { commonMessages } from '@/messages/common-messages';
import { PaperForm } from '@/components/widgets/common/paper-form';
import { LoginForm } from './login-form/login-form';
import { connect } from 'react-redux';
import { Selectors } from '@/selectors';

interface ConnectedProps {
  isLoggedIn: boolean;
}

const mapStateToProps = (state) => ({
  isLoggedIn: Selectors.getIsLoggedIn(state)
})

class LoginPageBase extends React.PureComponent<ConnectedProps> {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    
    return (
      <MasterLayout title={<FormattedMessage {...commonMessages.login_page} />}>
        <PaperForm>
          <LoginForm />
        </PaperForm>
      </MasterLayout>
    );
  }
}

export const LoginPage = connect(mapStateToProps)(LoginPageBase);

export const LoginPageRoute = (
  <Route key="login-page" path="/login" exact component={LoginPage} />
);