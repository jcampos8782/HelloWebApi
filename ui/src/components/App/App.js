import React from 'react';
import { Switch, Route } from "react-router-dom";

import * as Modals from '../Modals';
import BottomNav from '../BottomNav';
import ManagementDrawer from '../ManagementDrawer';
import TopNav from '../TopNav';

import Home from '../Home';
import ToDoList from '../ToDoList';

import { light, dark } from '../../styles/themes';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class App extends React.Component {

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
    var {classes} = this.props;

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

            <Container className={classes.content}>
              <Switch>
                <Route exact path="/">
                  <Home
                    avatar={this.props.avatars.default}
                    contact={this.props.contact}
                    title={this.props.title}
                  />
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
            </Container>

            <BottomNav
              onTechnologiesClick={() =>
                this.setState({ openModal: 'technologies' })
              }

              onCopyrightClick={() =>
                this.setState({ openModal: 'copyright' })
              }
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
