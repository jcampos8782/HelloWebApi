import TopNav from './TopNav';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  icons: {
    textAlign: 'right',
    '& span': {
      fontSize: '1.25em',
      color: theme.palette.secondary.dark
    }
  },
});

export default withStyles(styles)(TopNav);
