import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './views/App';

import 'carbon-components/scss/globals/scss/styles.scss';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
