import React from 'react';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { Theme, Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import classNames from 'classnames';

type ClassNameKeys = 'button';
const styles = (theme: Theme): StyleRules<ClassNameKeys> => ({
  button: {
    margin: '0 auto',
    marginTop: theme.spacing.unit,
    textAlign: 'center',
  }
});

class CenteredButtonBase extends React.PureComponent<ButtonProps & WithStyles<ClassNameKeys>> {
  render() {
    const { classes, children, className, ...rest } = this.props;

    return (
      <Button {...rest} className={classNames({[classes.button]: true, [className]: true})}>
        {children}
      </Button>
    );
  }
}

const StyledComponent = withStyles(styles, { name: 'CenteredButton' })(CenteredButtonBase);
export const CenteredButton = StyledComponent