import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

export default class BottomNav extends React.Component {

  render() {
    return (
      <BottomNavigation showLabels className={this.props.classes.root}>
        <BottomNavigationAction
          label="About"
          icon={<Icon className='fas fa-bars' />}
          onClick={this.props.onAboutClick}
        />
        <BottomNavigationAction
          label="Technologies"
          icon={<Icon className='fas fa-robot'  />}
          onClick={this.props.onTechnologiesClick}
        />
        <BottomNavigationAction
          label="Theme"
          icon={<Icon className='fas fa-sun'  />}
          onClick={this.props.onThemeClick}
        />
      </BottomNavigation>
    );
  }
}
