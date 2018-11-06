import { connect,  Provider, Connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import React from 'react';

import routes from './routes';
import appStore from './store';
import { messages } from './messages/messages';
import { Selectors } from './selectors';
import { MuiThemeProvider } from '@material-ui/core';
import { setupAxios } from './helpers/axios-setup';
import { setupMUITheme } from './helpers/setup-mui-theme';

setupAxios(appStore);
const generatedRoutes = routes(appStore);
const theme = setupMUITheme();

interface RootProps {
  store: any;
}

interface ConnectedProps {
  current_locale: string;
}

const mapStateToProps = (state) => ({
  current_locale: Selectors.getCurrentLocale(state),
});

class RootBase extends React.PureComponent<ConnectedProps & RootProps> {
  render() {
    const { store, current_locale } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <IntlProvider locale={current_locale} messages={messages[current_locale]}>
            {generatedRoutes}
          </IntlProvider>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

const ConnectedComponent = connect(mapStateToProps)(RootBase);
export { ConnectedComponent as Root };
