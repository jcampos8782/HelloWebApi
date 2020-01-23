import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
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
          <Container className={classes.container}>
            <Tooltip title="Home">
              <NavLink to="/">
                <IconButton edge="end" aria-label="todo-list">
                  <Icon className={classes.navLink + ' fas fa-home'} />
                </IconButton>
              </NavLink>
            </Tooltip>

            <Tooltip title="To-Do List" className={classes.tooltip}>
              <NavLink to="/todo">
                <IconButton edge="end" aria-label="todo-list">
                  <Icon className={classes.navLink + ' fas fa-list'} />
                </IconButton>
              </NavLink>
            </Tooltip>

            <Tooltip title="AWS">
              <NavLink to="/aws" className={classes.navLink}>
                <IconButton edge="end" aria-label="coming-soon">
                  <Icon className={classes.navLink + ' fas fa-cloud'} />
                </IconButton>
              </NavLink>
            </Tooltip>
          </Container>

          <Grid className={classes.switch} container alignItems="center" spacing={1}>
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
        </Toolbar>
      </AppBar>
    );
  }
}
