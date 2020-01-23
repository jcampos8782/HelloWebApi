import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import * as Modals from './components/Modals';
import BottomNav from './components/BottomNav';
import ManagementDrawer from './components/ManagementDrawer';
import TopNav from './components/TopNav';
import ToDoList from './components/ToDoList';

import './index.css';
import { light, dark } from './styles/themes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import properties from './properties';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        useDarkTheme: props.theme === 'dark',
        drawerOpen: props.drawer.open,
        openModel: null
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
              switchOn={this.state.useDarkTheme}
              onSwitchToggle={() =>
                this.setState({useDarkTheme: !this.state.useDarkTheme})
              }
            />
            <ManagementDrawer
              anchor={this.props.drawer.anchor}
              open={this.state.drawerOpen}
              drawerItems={this.props.drawer.items}
              loginAction={() => this.setState({ openModal: 'login' })}
            />

            <Switch>
              <Route exact path="/">
                <Typography variant='h3'>Coming Soon!</Typography>
              </Route>

              <Route path="/todo">
                <ToDoList
                  title={this.props.todoList.heading}
                  defaultText={this.props.todoList.hintText}
                  apiEndpoint={this.props.todoList.apiEndpoint}
                />
              </Route>

              <Route path="/aws">
                <Typography variant='h3'>Coming Soon!</Typography>
              </Route>
            </Switch>

            <BottomNav
              onAboutClick={() =>
                this.setState({ openModal: 'about' })
              }

              onTechnologiesClick={() =>
                this.setState({ openModal: 'technologies' })
              }

              onCopyrightClick={() =>
                this.setState({ openModal: 'copyright' })
              }
            />

            <Modals.About {...this.props.modals.about}
              contact={this.props.contact}
              open={this.state.openModal === 'about'}
              avatar={this.props.avatars.default}
              onClose={() => this.setState({openModal: null})}
            />

            <Modals.Tech {...this.props.modals.technologies}
              open={this.state.openModal === 'technologies'}
              onClose={() => this.setState({openModal: null})}
            />

            <Modals.Login {...this.props.modals.login}
              open={this.state.openModal === 'login'}
              onClose={() => this.setState({openModal: null})}
            />

            <Modals.Copyright {...this.props.modals.copyright}
              open={this.state.openModal === 'copyright'}
              onClose={() => this.setState({openModal: null})}
            />
          </ThemeProvider>
        </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <App {...properties} />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
