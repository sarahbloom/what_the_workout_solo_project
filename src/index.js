import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import reducer from './redux/reducers';

import App from './App';
import rootSaga from './redux/sagas';

// Initializing to an empty object, but here is where you could
// preload your redux state with initial values (from localStorage, perhaps)
const preloadedState = {};
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4dd0e1',
      main: '#26c6da',
      dark: '#0095a8',
      contrastText: '#000000',
    },
    secondary: {
      main: '#1A237E',
      contrastText: '#000000',
    },
  },
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
