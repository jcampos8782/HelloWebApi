import React from 'react';
import ReactDOM from 'react-dom';

import TopNav from './TopNav';
import ToDoList from './ToDoList';
import ManagementDrawer from './ManagementDrawer';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

import './index.css';

import * as serviceWorker from './serviceWorker';

const drawerItems = [
  {
    title: "Admin",
    items: [
      {
        id: 'kibana',
        text: 'Kibana',
        subtext: 'Monitoring & Dashboards',
        location: 'http://localhost:5601',
        avatar: '/images/elastic/color/logo-kibana-64-color.svg'
      },
      {
        id: 'consul',
        text: 'Consul',
        subtext: 'Configuration management',
        location: 'http://localhost:8500/ui',
        avatar: '/images/hashicorp/consul/Logos/SVG/Vertical Logos/Full Color/Consul_VerticalLogo_FullColor.svg',
      },
      {
        id: 'rmq',
        text: 'RabbitMQ',
        subtext: 'Event Queue',
        location: 'http://localhost:15672',
        avatar: '/images/rabbitmq.svg',
      }
    ]
  },
  {
    title: "Contact",
    items: [
      {
        id: 'github',
        text: 'Github',
        subtext: 'jcampos8782',
        location: 'http://github.com/jcampos8782',
        avatar: 'https://avatars0.githubusercontent.com/u/3411401?s=400&u=bd10458dbf4bc6011a4de3a0adbb62d274a69a83&v=4'
      },
      {
        id: 'linkedin',
        text: "LinkedIn",
        subtext: "json-campos",
        location: 'http://linkedin.com/in/json-campos',
        avatar: 'https://media.licdn.com/dms/image/C5603AQHCKGEgAMNVRA/profile-displayphoto-shrink_200_200/0?e=1583971200&v=beta&t=7QAydTm6EwbMY_IUTHIIqUPF1K-16JE8kTMx0mRftUY',
      },
      {
        id: 'email',
        text: "Email",
        subtext: "jcampos8782@gmail.com",
        location: 'mailto:jcampos8782@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a-/AAuE7mCnJ3Z-BcKPhpfpDhFae_APhXcNZ5Fd3_QTm4M-eA=s96-cc-rg',
      },
    ]
  }
];

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
        useDarkTheme: true,
        drawerOpen: false,
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
              toggleAbout={() => window.alert("Coming soon!")}
              />
            <ManagementDrawer
              anchor="right" // TODO: Move this to the left!
              open={this.state.drawerOpen}
              drawerItems={drawerItems}
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
