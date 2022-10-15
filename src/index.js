import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesWrapper from './config/Routes';
import './less/index.less';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <Router>
        <RoutesWrapper />
      </Router>
    </CookiesProvider>
  </Provider>
);
