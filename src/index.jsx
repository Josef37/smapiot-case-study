import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline"
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./redux/store"
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <CssBaseline />
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
