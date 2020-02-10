import TopNav from './TopNav';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {
    display: 'inline-block',
  },
  toolbar: {
    paddingLeft: 0,
    minWidth: 400
  },
  container: {
    position: 'relative',
    paddingLeft: 0,
    '& > a': {
      textDecoration: 'none',
      marginLeft: 20
    }
  },
  menuBtn: {
    position: 'relative',
    display: 'inline-block',
    top: -2
  },
  switch: {
    position: 'relative',
    marginRight: -20,
  },
  switchItem: {
    display: 'inline-block'
  },
  navLink: {
    width: 'fit-content',
    color: theme.palette.primary.contrastText
  }
});

export default withStyles(styles)(TopNav);
