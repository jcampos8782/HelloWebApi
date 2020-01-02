import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        <ul>
          {
            items.map(item => (
              <li key={item.id}>
                {item.name}{item.isComplete ? ' - X' : ''}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

class AddItemForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input type="text" value={this.props.value} onChange={this.props.onChange} />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

ReactDOM.render(
  <ToDoList />,
  document.getElementById('root')
);
