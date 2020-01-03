import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

import CheckBoxComplete from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxIncomplete from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const style = {
  button: {
    margin: 12,
  },
  textField: {
    margin: 12,
  },
}
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemFormText: '',
      error: null
    };
  }

  componentDidMount() {
      fetch('http://192.168.86.31:5000/api/todoitems')
        .then(res => res.json())
        .then((result) => {
          this.setState({
            items: result
          });
        });
  }

  render() {
    return (
      <div>
        <AddItemForm
          value={this.state.itemFormText}
          onChange={(e) => {
            this.setState({
              items: this.state.items.slice(),
              itemFormText: e.target.value
            });
          }}
          onSubmit={(e) => {
            e.preventDefault();
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
          }}
        />
        <Items items={this.state.items} />
      </div>
    );
  }
}

class Items extends React.Component {
  render() {
    const items = this.props.items;

    if (items.length === 0) {
      return <div>Nothing to do!</div>;
    }

    return(
      <div>
        <List>
        {
          items.map(i => (
            <ListItem
              key={i.id}
              primaryText={i.name}
              leftIcon={ i.isComplete ? <CheckBoxComplete /> : <CheckBoxIncomplete /> }
              />
          ))
        }
        </List>
      </div>
    );
  }
}

class AddItemForm extends React.Component {
  render() {
    const buttonEnabled = (this.props.value.length > 0);
    return (
      <form>
        <TextField
          hintText="Don't Forget To..."
          style={style.textField}
          onChange={this.props.onChange}
          value={this.props.value} />
        <RaisedButton
          label="Add Item"
          primary={buttonEnabled}
          disabled={!buttonEnabled}
          icon={<AddCircle />}
          style={style.button}
          onClick={this.props.onSubmit} />
      </form>
    );
  }
}

export default ToDoList;
