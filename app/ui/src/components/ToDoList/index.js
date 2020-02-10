import ToDoList from './ToDoList';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => (
  {
    root: {
      display: "inline-block",
      padding: 5,
      position: 'absolute',
    },
    actionLink: {
      color: theme.palette.action.main
    },
    addItemContainer: {
      textAlign: 'center',
      minWidth: 400
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
    trashIcon: {
      color: '#ffa000',
    },
  }
);

export default withStyles(styles)(ToDoList);
