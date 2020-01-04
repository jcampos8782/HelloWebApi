import React from 'react';

import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/container'
import Paper from '@material-ui/core/paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddIcon from '@material-ui/icons/Add';

const style = {
  root: {
    display: "inline-block",
    padding: 5
  },
  button: {
    margin: 12,
  },
  textField: {
    marginTop: 20,
    width: 300
  },
}

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
    fetch('http://192.168.86.31:5000/api/todoitems')
      .then(res => res.json())
      .then((result) => {
        this.setState({
          items: result,
          itemFormText: ''
        });
    });
  }

  render() {
    const complete = this.state.items.filter(i => i.isComplete);
    const incomplete = this.state.items.filter(i => !i.isComplete);

    return (
      <div style={style.root}>
        <Paper elevation={5}>
          <Container>
            <TextField
              id="time"
              type="text"
              placeholder="Don't forget to..."
              style={style.textField}
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
              style={style.button}
              onClick={ () => {
                if(this.state.itemFormText.length === 0) {
                  return;
                }

                fetch('http://192.168.86.31:5000/api/todoitems', {
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
                incomplete.map(item => (
                  <ListItem key={item.id} divider={true}>
                    <ListItemText>{item.name}</ListItemText>
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => {
                          fetch('http://192.168.86.31:5000/api/todoitems/' + item.id , {
                            method: 'PUT',
                            body: JSON.stringify({
                              id: item.id,
                              name: item.name,
                              isComplete: true
                            }),
                            headers: {
                              'Content-Type': 'application/json'
                            }
                          })
                          .then(() => this.loadItems())
                        }}
                        checked={false}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
              <ListSubheader>Complete</ListSubheader>
              {
                complete.map(item => (
                  <ListItem key={item.id} divider={true}>
                    <ListItemText>{item.name}</ListItemText>
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => {
                          fetch('http://192.168.86.31:5000/api/todoitems/' + item.id , {
                            method: 'PUT',
                            body: JSON.stringify({
                              id: item.id,
                              name: item.name,
                              isComplete: false
                            }),
                            headers: {
                              'Content-Type': 'application/json'
                            }
                          })
                          .then(() => this.loadItems())
                        }}
                        checked={true}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </Container>
        </Paper>
      </div>
    );
  }
}

export default ToDoList;
