import React from 'react';
import ReactDOM from 'react-dom';

import AboutModal from './components/AboutModal';
import ManagementDrawer from './components/ManagementDrawer';
import TopNav from './components/TopNav';
import ToDoList from './components/ToDoList';

import './index.css';
import { light, dark } from './styles/themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import drawerItems from './drawerItems';
import * as serviceWorker from './serviceWorker';

const properties = {
  title: '.NET Core + ReactJS w/ Material-UI',
  todoList: {
    apiEndpoint: 'http://192.168.86.31:5000/api/todoitems',
    heading: 'To-Do List',
    hintText: 'Don\'t forget to...',
  }
}

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        useDarkTheme: true,
        drawerOpen: false,
        modalOpen: false
      }
  }

  render() {
    const theme = this.state.useDarkTheme ? dark : light;

    return (
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopNav
              title={properties.title}
              toggleMenu={() =>
                this.setState({
                  drawerOpen: !this.state.drawerOpen
                })
              }
              toggleTheme={() =>
                this.setState({
                  useDarkTheme: !this.state.useDarkTheme
                })
              }
              toggleAbout={() =>
                this.setState({
                  modalOpen: true
                })
              }
              />
            <ManagementDrawer
              anchor="right" // TODO: Move this to the left!
              open={this.state.drawerOpen}
              drawerItems={drawerItems}
            />
            <ToDoList
              title={properties.todoList.header}
              defaultText={properties.todoList.hintText}
              apiEndpoint={properties.todoList.apiEndpoint}
            />
            <AboutModal
              open={this.state.modalOpen}
              onClose={() =>
                this.setState({
                  modalOpen: false
                })
            } />
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
