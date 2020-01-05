import React from 'react';
import ReactDOM from 'react-dom';

import TopNav from './TopNav';
import ToDoList from './ToDoList';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

import './index.css';

import * as serviceWorker from './serviceWorker';

const light = createMuiTheme({
  palette: {
    type: 'light',
    // Customize the colors
    primary: {
      main: '#90caf9'
    },
    secondary: {
      main: '#f48fb1'
    }
  }
});


const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[800],
    }
  }
});

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        useDarkTheme: true
      }
  }

  render() {
    const theme = this.state.useDarkTheme ? dark : light;

    return (
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopNav
              title=".NET Core + ReactJS & Material-Ui"
              githubUrl="http://github.com/jcampos8782/HelloWebApi"
              linkedInProfile="http://linkedin.com/in/json-campos"
              emailAddress="jcampos8782@gmail.com"
              toggleTheme={() =>
                this.setState({
                useDarkTheme: !this.state.useDarkTheme
              })}
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
