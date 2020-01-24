import AppDrawer from './AppDrawer';

import {withStyles} from '@material-ui/core/styles';
const styles = {
  account: {
    width: 'fit-content',
    marginTop: 20,
    '& > .far': {
      fontSize: '2.5em'
    },
    '& > .sign-in-txt': {
      marginLeft: 5,
      float: 'right',
      fontSize: '1.1em'
    }
  }
}

export default withStyles(styles)(AppDrawer);
