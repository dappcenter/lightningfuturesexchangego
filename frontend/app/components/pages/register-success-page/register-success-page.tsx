import React from 'react';
import { Route } from 'react-router';
import { MasterLayout } from '@/components/layouts/master/master-layout';
import { commonMessages } from '@/messages/common-messages';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { defineMessages } from 'react-intl';
import { PaperForm } from '@/components/widgets/common/paper-form';
import { LinkButton } from '@/components/widgets/common/link-button';
import { CenteredButton } from '@/components/widgets/common/centered-button';

const messages = defineMessages({
  registerSuccessTitle: {
    id: 'registerSuccessPage.registerSuccessTitle',
    defaultMessage: 'Register Success'
  },
  registerSuccessMessage: {
    id: 'registerSuccessPage.registerSuccessMessage',
    defaultMessage: 'You have registered successfully.  You may now login with the username you have created.  Please click the login button below to proceed to login.'
  }
})

export class RegisterSuccessPage extends React.PureComponent {
  render() {
    return (
      <MasterLayout title={<FormattedMessage {...messages.registerSuccessTitle} />}>
        <PaperForm>
          <Typography variant="body2">
            <FormattedMessage {...messages.registerSuccessMessage} />
          </Typography>
          <LinkButton to="/login">
            <CenteredButton variant="contained" color="primary" fullWidth={false}>
              <FormattedMessage {...commonMessages.login} />
            </CenteredButton>
          </LinkButton>
        </PaperForm>
      </MasterLayout>
    );
  }
}

export const RegisterSuccessPageRoute = (
  <Route key="register-success-page" path="/registersuccess" exact component={RegisterSuccessPage} />
);