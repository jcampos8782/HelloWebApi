import HomeCard from './HomeCard';

import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
  actionLink: {
    color: theme.palette.action.main,
  },
  avatar: {
    '& > img': {
      height: 'auto'
    }
  }
});

export default withStyles(styles)(HomeCard);
