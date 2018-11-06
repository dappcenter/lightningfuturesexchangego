/* global process */
import _ from 'lodash';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import MuiAppBar from '@material-ui/core/AppBar';
import LanguageIcon from '@material-ui/icons/Language';
import MuiIconButton from '@material-ui/core/IconButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { StyleRules, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
import { commonMessages } from '@/messages/common-messages';
import { messages } from '@/messages/messages';
import { I18nHandlerActions, UserActions } from '@/actions';
import { MenuIconButton } from '@/components/widgets/common/menu-icon-button';
import { Selectors } from '@/selectors';
import { Button } from '@material-ui/core';

type ClassKeys = 'button' | 'root' | 'toolBar' | 'toolBarItem' | 'toolBarItemFlexible' | 'verticalDivider' | 'linkButton';
function styles(theme: Theme): StyleRules<ClassKeys> {
  return {
    button: {
      textDecoration: 'none'
    },
    root: {
      boxShadow: 'none',
      flex: '0 0 48px',
      position: 'static'
    },
    toolBar: {
      height: '48px',
      minHeight: '48px',
      justifyContent: 'space-between',
      padding: '0'
    },
    toolBarItem: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      flex: '0 0'
    },
    toolBarItemFlexible: {
      flex: '1 0'
    },
    verticalDivider: {
      width: '1px',
      height: '100%',
      backgroundColor: theme.palette.background['appBarDivider']
    },
    linkButton: {
      color: 'inherit',
      textDecoration: 'none'
    }
  };
}

interface ConnectedProps {
  current_locale: string;
  isLoggedIn: boolean;
}

const mapStateToProps = (state) => ({
  current_locale: Selectors.getCurrentLocale(state),
  isLoggedIn: Selectors.getIsLoggedIn(state)
});

interface DispatchProps {
  changeLocale(locale: string): void;
  logout(): void;
}

const mapDispatchToProps = (dispatch) => ({
  changeLocale: (locale:string) => dispatch(I18nHandlerActions.changeLocale(locale)),
  logout: () => dispatch(UserActions.logout())
});

class AppBarBase extends React.PureComponent<ConnectedProps & DispatchProps & WithStyles<ClassKeys>> {
  changeLocale = (locale: string) => {
    return () => {
      this.props.changeLocale(locale);
    }
  }
  
  render() {
    const { classes, current_locale, isLoggedIn, logout } = this.props;

    return (
      <MuiAppBar color="primary" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.toolBarItem}>
            <Link to={'/'} >
              <MuiIconButton>
                <HomeIcon className={classes.button} />
              </MuiIconButton>
            </Link>
            <Divider className={classes.verticalDivider} />
          </div>
          <div className={classes.toolBarItem}>
            <Divider className={classes.verticalDivider} />
            <MenuIconButton
              key={'2'}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              icon={<LanguageIcon className={classes.button} />}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              {Object.keys(messages).map((locale) => (
                <MenuItem key={locale} onClick={this.changeLocale(locale)} disabled={current_locale === locale}>
                  {locale}
                </MenuItem>
              ))}
            </MenuIconButton>
            <Divider className={classes.verticalDivider} />
            {!isLoggedIn && <React.Fragment>
              <MenuItem key="login">
                <Link to={'/login'} className={classes.linkButton}>
                  <FormattedMessage {...commonMessages.login} />
                </Link>
              </MenuItem>
              <MenuItem key="register">
                <Link to={'/register'} className={classes.linkButton}>
                  <FormattedMessage {...commonMessages.register} />
                </Link>
              </MenuItem>
            </React.Fragment>}
            {isLoggedIn && <React.Fragment>
              <MenuItem key="logout">
                <Link to={'/'} className={classes.linkButton} onClick={logout}>
                  <FormattedMessage {...commonMessages.logout} />
                </Link>
              </MenuItem>
            </React.Fragment>}
            <Divider className={classes.verticalDivider} />
          </div>
        </Toolbar>
      </MuiAppBar>
    );
  }
}

const StyledComponent = withStyles(styles, { name: 'AppBar' })(AppBarBase);
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(StyledComponent);
export { ConnectedComponent as AppBar };