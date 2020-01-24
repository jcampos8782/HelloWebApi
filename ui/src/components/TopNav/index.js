import TopNav from './TopNav';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {
    display: 'inline-block',
  },
  toolbar: {
    paddingLeft: 0
  },
  container: {
    position: 'relative',
    paddingLeft: 0,
    '& > a': {
      textDecoration: 'none',
      marginLeft: 20
    }
  },
  switch: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    right: '0%',
    marginTop: 5,
    marginRight: 5,
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
