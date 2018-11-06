import React from 'react';
import { Route, Redirect } from 'react-router';

import { MasterLayout } from '@/components/layouts/master/master-layout';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { commonMessages } from '@/messages/common-messages';
import { connect } from 'react-redux';
import { Selectors } from '@/selectors';
import Axios from 'axios';

interface ConnectedProps {
  isLoggedIn: boolean;
}

const mapStateToProps = (state) => ({
  isLoggedIn: Selectors.getIsLoggedIn(state)
})

interface DashboardPageState {
  response: string;
}

class DashboardPageBase extends React.PureComponent<ConnectedProps,DashboardPageState> {
  state = {
    response: 'loading.....'
  }

  constructor(props, context) {
    super(props, context);

    Axios.get('/api/hello')
      .then((res) => {
        this.setState({
          response: JSON.stringify(res.data)
        })
      })
      .catch((res) => {
      })
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <MasterLayout title={<FormattedMessage {...commonMessages.dashboardPage} />}>
      </MasterLayout>
    );
  }
}

export const DashboardPage = connect(mapStateToProps)(DashboardPageBase);

export const DashboardPageRoute = (
  <Route key="dashboard-page" path="/dashboard" exact component={DashboardPage} />
);