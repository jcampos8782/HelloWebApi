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
  }
});

export default withStyles(styles)(Home);
