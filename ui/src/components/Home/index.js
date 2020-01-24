import Home from './Home';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    'a': {
      textDecoration: 'none'
    }
  },
  content: {
    textAlign: 'justify'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actionLink: {
    color: theme.palette.action.main,
  }
});

export default withStyles(styles)(Home);
