import classNames from 'classnames';
import React from 'react';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { AppBar } from './app-bar/app-bar';
import { Typography, CssBaseline, Theme } from '@material-ui/core';

type ClassNameKeys = 'root'|'content'|'title';
const styles = (theme: Theme): StyleRules<ClassNameKeys> => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw'
  },
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flex: '1 1 1px',
    flexDirection: 'column'
  },
  title: {
    margin: '0 auto',
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4
  }
});

interface MasterLayoutProps {
  className?: string;
  title: React.ReactNode;
}

class MasterLayoutBase extends React.PureComponent<MasterLayoutProps & WithStyles<ClassNameKeys>> {
  render() {
    const {
      classes,
      className,
      children,
      title
    } = this.props;

    return (
      <div className={classNames(classes.root, className)}>
        <CssBaseline />
        <AppBar />
        <Typography component="h1" variant="h4" className={classes.title} >
          {title}
        </Typography>
        <div className={classes.content}>{children}</div>
      </div>
    );
  }
}

export const MasterLayout = withStyles(styles, { name: 'MasterLayout' })(MasterLayoutBase);