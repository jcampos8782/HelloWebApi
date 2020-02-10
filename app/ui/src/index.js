import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router} from "react-router-dom";

import App from './components/App';
import properties from './properties';
import './index.css';
import './styles/font-awesome/5.12.0/css/all.min.css';

ReactDOM.render(
  <Router>
    <App {...properties} />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
