import BottomNav from './BottomNav.js';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0%',
    '& .material-icons': {
      width: 'inherit',
      color: theme.palette.success.light
    }
  }
})

export default withStyles(styles)(BottomNav);
