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

    var {
      avatars,
      classes,
      components,
      contact,
      routes
    } = this.props;

    return (
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopNav
              contact={contact}
              switchOn={this.state.useDarkTheme}
              onSwitchToggle={() =>
                this.setState({useDarkTheme: !this.state.useDarkTheme})
              }
              onMenuToggle={() =>
                this.setState({drawerOpen: !this.state.drawerOpen})
              }
            />
            <AppDrawer
              {...classes}
              {...components.drawer}

              open={this.state.drawerOpen}
              loginAction={() => this.setState({ openModal: 'login' })}
              close={() => this.setState({drawerOpen: false})}
            />

            <Container className={classes.content}>
              <Switch>
                <Route exact path={routes.home}>
                  <Home
                    {...classes}
                    {...components.home}
                    avatar={avatars.default}
                    contact={contact}
                  />
                </Route>

                <Route path={routes.todo}>
                  <ToDoList {...components.todo} />
                </Route>

                <Route path={routes.aws}>
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

            <Modals.Tech {...components.modals.technologies}
              open={this.state.openModal === 'technologies'}
              onClose={() => this.setState({openModal: null})}
            />

            <Modals.Login {...components.modals.login}
              open={this.state.openModal === 'login'}
              onClose={() => this.setState({openModal: null})}
            />

            <Modals.Copyright {...components.modals.copyright}
              open={this.state.openModal === 'copyright'}
              onClose={() => this.setState({openModal: null})}
            />
          </ThemeProvider>
        </div>
    )
  }
}
