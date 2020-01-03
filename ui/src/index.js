import React from 'react';
import ReactDOM from 'react-dom';
import ToDoList from './ToDoList';

import Container from '@material-ui/core/Container';
import AppBar from 'material-ui/AppBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css';
import * as serviceWorker from './serviceWorker';


const App = () => (
  <div>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppBar title=".Net Core + ReactJS w/ Material UI Demo">

      </AppBar>
    </MuiThemeProvider>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Container maxWidth="sm">
          <ToDoList />
      </Container>
    </MuiThemeProvider>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
