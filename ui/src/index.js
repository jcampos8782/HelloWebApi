import React from 'react';
import ReactDOM from 'react-dom';

import {AboutModal,CopyrightModal,TechModal} from './components/Modals';
import BottomNav from './components/BottomNav';
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
      this.state = {
        useDarkTheme: props.theme === 'dark',
        drawerOpen: true,
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
            />
            <ToDoList
              title={this.props.todoList.heading}
              defaultText={this.props.todoList.hintText}
              apiEndpoint={this.props.todoList.apiEndpoint}
            />

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

            <AboutModal {...this.props.modals.about}
              key="about_modal"
              contact={this.props.contact}
              open={this.state.openModal === 'about'}
              avatar={this.props.avatars.default}
              onClose={() => this.setState({openModal: null})}
            />

            <TechModal {...this.props.modals.technologies}
              key="tech_modal"
              open={this.state.openModal === 'technologies'}
              onClose={() => this.setState({openModal: null})}
            />

            <CopyrightModal {...this.props.modals.copyright}
              key="copyright_modal"
              open={this.state.openModal === 'copyright'}
              onClose={() => this.setState({openModal: null})}
            />
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
