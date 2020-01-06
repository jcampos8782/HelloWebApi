import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export default class TopNav extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
