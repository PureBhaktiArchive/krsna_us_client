
import React, { Component } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import MoreVert from '@material-ui/icons/MoreVert';

class MoreOptions extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      anchorEl: null,
      anchorReference: 'anchorEl',
      menuAnchorEl: null
    };
  }

  render() {
    const { menuAnchorEl } = this.state;
    const { user: { loggedIn, provider }, classes } = this.props;
    return (
      <div>
        <IconButton onClick={this.openMenu}>
          <MoreVert/>
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={this.closeMenu}
          MenuListProps={{ style: { display: 'flex', flexDirection: 'column' } }}
        >
          <MenuItem style={{ order: 1 }} onClick={this.closeMenu}>Donate</MenuItem>
          {
            loggedIn ?
              provider !== 'facebook' ? (
                <MenuItem
                  style={{ order: 0 }}
                  key={'menu-my-account'}
                  onClick={() => this.closeMenu('/my_account/')}
                >
                  My Account
                </MenuItem>
              ):null
              :
              null
          }
          {
            loggedIn ?
              [
                <MenuItem
                  style={{ order: -1 }}
                  key={'menu-logged-out'}
                  onClick={() => this.closeMenu('/logout/')}
                >
                  Log out
                </MenuItem>,
                <MenuItem
                  className={classes.hiddenLg}
                  key={'menu-all-playlists'}
                  onClick={() => {
                    this.closeMenu('/playlists/');
                  }}
                >
                  All playlists
                </MenuItem>
              ]
              :
              [
                <MenuItem
                  style={{ order: 2 }}
                  key={'menu-logged-in'}
                  onClick={() => this.closeMenu('/login')}
                >
                  Log in
                </MenuItem>,
                <MenuItem
                  style={{ order: 3 }}
                  key={'menu-sign-up'}
                  onClick={() => this.closeMenu('/register')}
                >
                  Sign up
                </MenuItem>
              ]
          }
        </Menu>
      </div>
    );
  }

  openMenu = (event) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  closeMenu = (route) => {
    this.setState({ menuAnchorEl: null });
    typeof route === 'string' && this.props.history.push(route);
  };


}

export default MoreOptions;
