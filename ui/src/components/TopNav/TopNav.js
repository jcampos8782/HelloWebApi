import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

export default class TopNav extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Grid className={classes.switch} container alignItems="center" justify="flex-start" spacing={1}>
            <Grid item className={classes.displayItem}>
              <Icon className="fas fa-sun" />
            </Grid>
            <Grid item className={classes.displayItem}>
              <Switch
                id="theme-switch"
                checked={this.props.switchOn}
                onChange={this.props.onSwitchToggle}
                value="theme"
                color="secondary"
              />
            </Grid>
            <Grid item className={classes.displayItem}>
              <Icon className="fas fa-moon" />
            </Grid>
          </Grid>

          <Grid  container alignItems="center" justify="flex-end" spacing={2}>
            <Grid item className={classes.displayItem}>
              <IconButton aria-label="github" onClick={() => window.open(this.props.contact.github)}>
                  <Icon className='fab fa-github'  />
              </IconButton>
            </Grid>
            <Grid item className={classes.displayItem} onClick={() => window.open(this.props.contact.linkedin)}>
              <IconButton aria-label="linkedin">
                <Icon className='fab fa-linkedin' />
              </IconButton>
            </Grid>
            <Grid item className={classes.displayItem} onClick={() => window.open(`mailto:this.props.contact.email`)}>
              <IconButton aria-label="settings">
                <Icon className='far fa-envelope' />
              </IconButton>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }
}
