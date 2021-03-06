
import React, { Component } from 'react';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PlaylistPlay from '@material-ui/icons/PlaylistPlay';
import MusicNote from '@material-ui/icons/MusicNote';

import styles from '../styles/BottomNav.css';

const menuItems = [
  { label: 'Audio player', icon: <MusicNote /> },
  { label: 'Menu', icon: <Menu /> },
  { label: 'My playlists', icon: <PlaylistPlay /> }
];

class BottomNav extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: 4
    };
  }

  bottomNavChange = (event, value) => {
    const { value: currentValue } = this.state;
    const { mobileNavToggle, history, showPlayer } = this.props;
    let newValue = value;
    switch(value) {
    case 0: {
      if (showPlayer) {
        const audioPlayer = document.querySelector('#audioPlayer');
        mobileNavToggle();
        audioPlayer.scrollIntoView({ behavior: 'smooth' });
      }
      if (currentValue === 2) {
        newValue = 2;
      }
      else {
        newValue = 4;
      }
      break;
    }
    case 1:
      mobileNavToggle();
      if (currentValue === 2) {
        newValue = 2;
      }
      else {
        newValue = 4;
      }
      document.querySelector('#navDrawerTop').scrollIntoView({ behavior: 'smooth' });
      break;
    case 2:
      history.push('/playlists/me/');
      break;
    default:
      newValue = value;
    }
    this.setState({ value: newValue });
  };

  componentDidMount() {
    if (this.props.location.pathname === '/playlists/me/') {
      this.setState({ value: 2 });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { location: { pathname } } = nextProps;
    if (location.pathname !== pathname) {
      if ( pathname === '/playlists/me/') {
        this.setState({ value: 2 });
      }
      else {
        this.setState({ value: 4 });
      }
    }
  }

  render() {
    const { classes, bottomOfPage, directionDown } = this.props;
    return (
      <Hidden mdUp>
        <BottomNavigation
          id={'bottom-nav'}
          className={classNames('sticky', {
            [classes.hideNavBar]: !bottomOfPage && directionDown,
            [classes.showNavBar]: !directionDown
          })}
          style={{ width: '100%', bottom: '0' }}
          onChange={this.bottomNavChange}
          showLabels
          value={this.state.value}
        >
          {
            menuItems.map((item, index) => (
              <BottomNavigationAction
                key={`${item.label}-${index}`}
                label={item.label}
                icon={item.icon}
                classes={{
                  selected: classes.activeView
                }}
              />
            ))
          }
        </BottomNavigation>
      </Hidden>
    );
  }
}

export default withStyles(styles)(BottomNav);
