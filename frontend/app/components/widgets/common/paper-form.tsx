import React from 'react';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { Paper, Theme } from '@material-ui/core';

type ClassNameKeys = 'root';
const styles = (theme: Theme): StyleRules<ClassNameKeys> => ({
  root: {
    textAlign: 'center',
    width: 'auto',
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 2 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

class PaperFormBase extends React.PureComponent<WithStyles<ClassNameKeys>> {
  render() {
    const { children, classes } = this.props;

    return (
      <Paper className={classes.root}>
        {children}
      </Paper>
    );
  }
}

const StyledComponent = withStyles(styles, { name: 'PaperForm' })(PaperFormBase);
export const PaperForm = StyledComponent