import React from 'react';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { Theme} from '@material-ui/core';
import { Link } from 'react-router-dom';

type ClassNameKeys = 'buttonLink';
const styles = (theme: Theme): StyleRules<ClassNameKeys> => ({
  buttonLink: {
    textDecoration: 'none'
  }
});

interface LinkButtonProps {
  to: string;
}

class LinkButtonBase extends React.PureComponent<LinkButtonProps & WithStyles<ClassNameKeys>> {
  render() {
    const { classes, children, to } = this.props;

    return (
      <Link className={classes.buttonLink} to={to}>
        {children}
      </Link>
    );
  }
}

const StyledComponent = withStyles(styles, { name: 'LinkButton' })(LinkButtonBase);
export const LinkButton = StyledComponent