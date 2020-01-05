import React from 'react';
import ReactDOM from 'react-dom';

import TopNav from './TopNav';
import ToDoList from './ToDoList';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';

import * as serviceWorker from './serviceWorker';

class App extends React.Component {

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'light',
        primary: {
          main: '#90caf9'
        },
        secondary: {
          main: '#f48fb1'
        }
      }
    });

    return (
      <div>
        <ThemeProvider theme={theme}>
          <TopNav
            title=".NET Core + ReactJS & Material-Ui"
            githubUrl="http://github.com/jcampos8782/HelloWebApi"
            linkedInProfile="http://linkedin.com/in/json-campos"
            emailAddress="jcampos8782@gmail.com"
            />
          <ToDoList
            title="To-Do List"
            defaultText="Don't forget to..."
            apiEndpoint="http://192.168.86.31:5000/api/todoitems"/>
        </ThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
