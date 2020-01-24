import App from './App';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    // The AppBar needs to be position: fixed so offset this by the bar's height
    position: 'relative',
    display: 'inline-block',
    top: 64
  }
});

export default withStyles(styles)(App);
