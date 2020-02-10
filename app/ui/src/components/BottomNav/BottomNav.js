import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

export default class BottomNav extends React.Component {

  render() {
    return (
      <BottomNavigation showLabels className={this.props.classes.root}>
        <BottomNavigationAction
          label="Technologies"
          icon={<Icon className='fas fa-robot'  />}
          onClick={this.props.onTechnologiesClick}
        />
        <BottomNavigationAction
          label="Copyright"
          icon={<Icon className='fas fa-copyright'  />}
          onClick={this.props.onCopyrightClick}
        />
      </BottomNavigation>
    );
  }
}
