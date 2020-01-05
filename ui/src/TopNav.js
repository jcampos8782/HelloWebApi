import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
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
  divider: {
    backgroundColor: theme.palette.primary.contrastText,
    display: 'inline'
  },
});

class TopNav extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="open drawer">
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
            <Divider className={classes.divider} orientation="vertical" variant="inset" />
            <IconButton
              edge="end"
              aria-label="github"
              onClick={() => window.location.href=this.props.githubUrl}>
              <Icon className='fab fa-github' />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="linkedin"
              onClick={() => window.location.href=this.props.linkedInProfile}>
              <Icon className='fab fa-linkedin' />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="email"
              onClick={() => window.location.href="mailto:" + this.props.email}>
              <Icon className='far fa-envelope' />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TopNav);
