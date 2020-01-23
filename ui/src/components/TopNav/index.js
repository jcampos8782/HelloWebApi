import TopNav from './TopNav';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    left: 225,
    position: 'absolute',
    '& > h4': {
      display: 'inline-block',
      position: 'relative',
      top: 6,
    },
    '& > a': {
      textDecoration: 'none',
      marginLeft: 20
    }
  },
  switch: {
    position: 'absolute',
    right: '0%',
    marginTop: 5,
    marginRight: 5,
    width: 'fit-content',
  },
  navLink: {
    width: 'fit-content',
    color: theme.palette.secondary.light
  }
});

export default withStyles(styles)(TopNav);
