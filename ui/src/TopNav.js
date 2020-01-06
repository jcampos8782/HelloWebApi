import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  icons: {
    textAlign: 'right',
    '& span': {
      fontSize: '1.25em',
      color: theme.palette.secondary.dark
    }
  },
});

class TopNav extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={this.props.toggleMenu}>
            <Icon className='fas fa-bars' />
          </IconButton>
          <Container>
            <Typography variant="h5">
              {this.props.title}
            </Typography>
          </Container>
          <Container className={classes.icons}>
            <IconButton
              edge="end"
              aria-label="toggle theme"
              onClick={this.props.toggleTheme}>
              <Icon className='fas fa-sun' />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="about"
              onClick={this.props.toggleAbout}>
              <Icon className='fas fa-info-circle' />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TopNav);
