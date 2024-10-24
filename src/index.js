import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router';
import {Provider} from 'react-redux';
import {history} from './libs/History/history';
import store from './Redux/Reducer/storeConfig';
import "antd/dist/antd.css";
import "react-multi-carousel/lib/styles.css";
import "rc-banner-anim/assets/index.css";

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
