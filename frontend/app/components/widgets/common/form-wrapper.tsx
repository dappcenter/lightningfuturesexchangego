import React from 'react';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

type ClassNameKeys = 'root';
const styles = (theme: Theme): StyleRules<ClassNameKeys> => ({
  root: {
    textAlign: 'center',
    '& > form': {
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
    },
    '& > form > div': {
      marginBottom: theme.spacing.unit
    },
    '& > form > b': {
      marginTop: theme.spacing.unit
    }
  }
});

class FormWrapperBase extends React.Component<WithStyles<ClassNameKeys>> {
  render () {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}

export const FormWrapper = withStyles(styles, { name: 'FormWrapper' })(FormWrapperBase);