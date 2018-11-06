import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { PopoverProps } from '@material-ui/core/Popover';

interface MenuIconButtonProps extends Partial<PopoverProps> {
  icon: JSX.Element;
  children: any;
}

interface MenuIconButtonState {
  open: boolean;
  anchorEl: any;
}

export class MenuIconButton extends React.Component<MenuIconButtonProps, MenuIconButtonState> {
  readonly state = {
    open: false,
    anchorEl: undefined,
  };
  readonly handleRequestClose = (event) => {
    this.setState({
      open: false
    });
    if (event) {
      event.stopPropagation();
    }
  }
  readonly handleTouchTap = ({ currentTarget }) => {
    this.setState({
      anchorEl: currentTarget,
      open: true
    });
  }
  render() {
    const { children, icon, ...props } = this.props;
    const { anchorEl, open } = this.state;
    return (
      <div onClick={this.handleTouchTap}>
        <IconButton onClick={this.handleTouchTap}>
          {icon}
          <Menu
            anchorEl={anchorEl}
            onClose={this.handleRequestClose}
            open={open}
            {...props}
          >
            {React.Children.map(children, (child: any, key) => {
              const { props: { onClick } } = child;
              return React.cloneElement(child, {
                key,
                onClick: (event) => {
                  this.handleRequestClose(event);
                  if (onClick !== undefined) {
                    return onClick(event);
                  }
                }
              });
            })}
          </Menu>
        </IconButton>
      </div>
    );
  }
}
