import React from 'react';

import './font-awesome/5.12.0/css/all.css';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/container'
import Paper from '@material-ui/core/paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddIcon from '@material-ui/icons/Add';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        marginLeft: 10
      },
    },
  },
});

const styles = theme => (
  {
    root: {
      display: "inline-block",
      padding: 5
    },
    button: {
      margin: 12,
    },
    checkbox: {
      wordSpacing: 10
    },
    textField: {
      marginTop: 20,
      width: 300
    },
  }
);

class ToDoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemFormText: ''
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    fetch(this.props.apiEndpoint)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          items: result,
          itemFormText: ''
        });
    });
  }

  renderItem(item, classes) {
    return (
      <ListItem key={item.id} divider={true}>
        <Checkbox
          edge="end"
          checked={item.isComplete}
          className={classes.checkbox}
          onChange={() => {
            fetch(this.props.apiEndpoint + '/' + item.id , {
              method: 'PUT',
              body: JSON.stringify({
                id: item.id,
                name: item.name,
                isComplete: !item.isComplete
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(() => this.loadItems())
        }}
        />
        <ListItemText>
          <Typography>{item.name}</Typography>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={ () => {
              fetch(this.props.apiEndpoint + '/' + item.id , {
                method: 'DELETE'
              })
              .then(() => this.loadItems())
            }}
          >
            <Icon className="fas fa-trash" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    const {classes} = this.props;
    const complete = this.state.items.filter(i => i.isComplete);
    const incomplete = this.state.items.filter(i => !i.isComplete);

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Paper elevation={5}>
            <Typography variant="h4">{this.props.title}</Typography>
            <Container>
              <TextField
                id="time"
                type="text"
                placeholder={this.props.defaultText}
                className={classes.textField}
                value={this.state.itemFormText}
                onChange={ (e) => {
                  const items = this.state.items.slice();
                  this.setState({
                    items: items,
                    itemFormText: e.target.value
                  });
                }}
                />
              <Fab color="primary"
                aria-label="add"
                disabled={this.state.itemFormText.length === 0}
                className={classes.button}
                onClick={ () => {
                  if(this.state.itemFormText.length === 0) {
                    return;
                  }

                  fetch(this.props.apiEndpoint, {
                    method: 'POST',
                    body: JSON.stringify({ name: this.state.itemFormText }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(res => res.json())
                  .then((result) => {
                    const items = this.state.items.concat(result);
                    this.setState({
                      items: items,
                      itemFormText: ''
                    });
                  });
                }}>
                <AddIcon />
              </Fab>
            </Container>
            <Container>
              <List style={{width: 512}}>
                <ListSubheader>Incomplete</ListSubheader>
                {
                  incomplete.map((i) => this.renderItem(i, classes))
                }
                <ListSubheader>Complete</ListSubheader>
                {
                  complete.map((i) => this.renderItem(i, classes))
                }
              </List>
            </Container>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(ToDoList);
