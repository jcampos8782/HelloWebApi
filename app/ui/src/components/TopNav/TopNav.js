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
          <IconButton aria-label="menu" className={classes.menuBtn} onClick={this.props.onMenuToggle}>
            <Icon className='fas fa-bars' />
          </IconButton>

          <Grid className={classes.switch} container alignItems="center" justify="flex-start" spacing={1}>
            <Grid item>
              <Icon className="fas fa-sun" />
            </Grid>
            <Grid item>
              <Switch
                id="theme-switch"
                checked={this.props.switchOn}
                onChange={this.props.onSwitchToggle}
                value="theme"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Icon className="fas fa-moon" />
            </Grid>
          </Grid>

          <Grid container alignItems="center" justify="flex-end" spacing={1} >
            <Grid item>
              <IconButton aria-label="blog" onClick={() => window.open(this.props.contact.blog)}>
                  <Icon className='fas fa-blog'  />
              </IconButton>
              <IconButton aria-label="github" onClick={() => window.open(this.props.contact.github)}>
                  <Icon className='fab fa-github'  />
              </IconButton>
              <IconButton aria-label="linkedin" onClick={() => window.open(this.props.contact.linkedin)}>
                <Icon className='fab fa-linkedin' />
              </IconButton>
              <IconButton aria-label="settings" onClick={() => window.open('mailto:'+ this.props.contact.email )}>
                <Icon className='far fa-envelope' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
