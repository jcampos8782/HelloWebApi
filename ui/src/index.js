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

import properties from './properties';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {

  constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        useDarkTheme: props.theme === 'dark',
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
              title={this.props.title}
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
              anchor={this.props.drawer.anchor}
              open={this.state.drawerOpen}
              drawerItems={this.props.drawer.items}
            />
            <ToDoList
              title={this.props.todoList.header}
              defaultText={this.props.todoList.hintText}
              apiEndpoint={this.props.todoList.apiEndpoint}
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

ReactDOM.render(<App {...properties} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
