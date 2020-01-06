import TopNav from './TopNav';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  toolbar: {
    '& > h5': {
      left: 225,
      position: 'relative'
    }
  }
});

export default withStyles(styles)(TopNav);
