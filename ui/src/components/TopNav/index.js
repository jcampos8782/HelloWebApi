import TopNav from './TopNav';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    left: 225,
    position: 'absolute',
    width: 'fit-content',
    '& > button': {
      marginLeft: 20,
      color: theme.palette.secondary.light,
    },
    '& > h4': {
      display: 'inline-block',
      position: 'relative',
      top: 6,
    }
  }
});

export default withStyles(styles)(TopNav);
