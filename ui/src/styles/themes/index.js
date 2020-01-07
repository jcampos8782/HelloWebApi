import { createMuiTheme } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';

export const light = createMuiTheme({
  palette: {
    type: 'light',
    // Customize the colors
    secondary: {
      main: '#f48fb1'
    },
    warning: {
      main: '#ffc107',
    },
  }
});


export const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[800],
    },
    warning: {
      main: '#ffc107',
    }
  }
});
