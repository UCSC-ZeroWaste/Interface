import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './lib/store/store';
import App from './App';
// import '../node_modules/font-awesome/css/font-awesome.css';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();
  const root = document.getElementById('root');

  window.store = store;
  ReactDOM.render(<App store={store}/>, root);
});
