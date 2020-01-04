import React from 'react';

import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

  render() {
    const {classes} = this.props;
    const complete = this.state.items.filter(i => i.isComplete);
    const incomplete = this.state.items.filter(i => !i.isComplete);

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Paper elevation={5}>
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
                  incomplete.map(item => (
                    <ListItem key={item.id} divider={true}>
                      <FormControl className={classes.formControl}>
                        <FormControlLabel
                          label={item.name}
                          className={classes.formControlLabel}
                          control= {
                            <Checkbox
                              edge="end"
                              checked={false}
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
                          }
                        />
                        <ListItemSecondaryAction>

                        </ListItemSecondaryAction>
                      </FormControl>
                    </ListItem>
                  ))
                }
                <ListSubheader>Complete</ListSubheader>
                {
                  complete.map(item => (
                    <ListItem key={item.id} divider={true}>
                      <FormControlLabel
                        label={item.name}
                        control= {
                          <Checkbox
                            edge="end"
                            checked={false}
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
                        }
                      />
                      <ListItemSecondaryAction>

                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
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
