import React from 'react';
import { Route, Redirect } from 'react-router';

import { MasterLayout } from '@/components/layouts/master/master-layout';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { commonMessages } from '@/messages/common-messages';
import { connect } from 'react-redux';
import { Selectors } from '@/selectors';

interface ConnectedProps {
  isLoggedIn: boolean;
}

const mapStateToProps = (state) => ({
  isLoggedIn: Selectors.getIsLoggedIn(state)
})

export class LandingPageBase extends React.PureComponent<ConnectedProps> {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <MasterLayout title={<FormattedMessage {...commonMessages.landingPage} />}>
      </MasterLayout>
    );
  }
}

export const LandingPage = connect(mapStateToProps)(LandingPageBase);

export const LandingPageRoute = (
  <Route key="landing-page" path="/" exact component={LandingPage} />
);