import React from 'react';
import { Switch, Route } from "react-router-dom";

import AppDrawer from '../AppDrawer';
import BottomNav from '../BottomNav';
import * as Modals from '../Modals';
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
        drawerOpen: false,
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
              contact={this.props.contact}
              switchOn={this.state.useDarkTheme}
              onSwitchToggle={() =>
                this.setState({useDarkTheme: !this.state.useDarkTheme})
              }
              onMenuToggle={() =>
                this.setState({drawerOpen: !this.state.drawerOpen})
              }
            />
            <AppDrawer
              {...this.props.classes}
              {...this.props.components.drawer}

              open={this.state.drawerOpen}
              loginAction={() => this.setState({ openModal: 'login' })}
              close={() => this.setState({drawerOpen: false})}
            />

            <Container className={classes.content}>
              <Switch>
                <Route exact path="/">
                  <Home
                    {...this.props.classes}
                    {...this.props.components.home}
                    avatar={this.props.avatars.default}
                    contact={this.props.contact}
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
