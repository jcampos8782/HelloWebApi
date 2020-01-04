import React from 'react';
import ReactDOM from 'react-dom';

import TopNav from './TopNav';
import ToDoList from './ToDoList';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './index.css';
import * as serviceWorker from './serviceWorker';

const App = () => (
  <div>
    <TopNav
      title=".NET Core + ReactJS & Material-Ui"
      />
    <ToDoList
      defaultText="Don't forget to..."
      apiEndpoint="http://192.168.86.31:5000/api/todoitems"/>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
