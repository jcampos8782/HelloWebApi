import Home from './Home';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    'a': {
      textDecoration: 'none'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  headerActionLinks: {
    color: '#ff7f50',
  }
});

export default withStyles(styles)(Home);
