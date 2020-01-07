import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

export default class TopNav extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Container className={classes.container}>
            <Typography variant='h4'>Apps</Typography>

            <Tooltip title="To-Do List">
              <IconButton edge="end" aria-label="todo-list">
                <Icon className='fas fa-list' />
              </IconButton>
            </Tooltip>

            <Tooltip title="More Apps Coming Soon!">
              <IconButton edge="end" aria-label="coming-soon">
                <Icon className='fas fa-ellipsis-h' />
              </IconButton>
            </Tooltip>
          </Container>

          <Grid className={classes.switch} container alignItems="center" spacing={1}>
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
        </Toolbar>
      </AppBar>
    );
  }
}
