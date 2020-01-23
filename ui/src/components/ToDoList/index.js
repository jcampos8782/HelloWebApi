import ToDoList from './ToDoList';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => (
  {
    root: {
      display: "inline-block",
      padding: 5,
      position: 'absolute',
    },
    button: {
      margin: 12,
    },
    checkbox: {
      marginRight: 10,
    },
    textField: {
      marginTop: 20,
      width: 300,
    },
    title: {
      paddingLeft: 15,
      paddingTop: 10,
    },
    trashIcon: {
      color: '#ffa000',
    },
  }
);

export default withStyles(styles)(ToDoList);
