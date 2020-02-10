import AppDrawer from './AppDrawer';

import {withStyles} from '@material-ui/core/styles';
const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  avatar: {
    '& > img': {
      height: 'auto'
    }
  }
}

export default withStyles(styles)(AppDrawer);
