import HomeCard from './HomeCard';

import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
  actionLink: {
    color: theme.palette.action.main,
  }
});

export default withStyles(styles)(HomeCard);
