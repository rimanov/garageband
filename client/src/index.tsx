// 3rd party library imports
import React from 'react';
import ReactDOM from 'react-dom';

// project imports
import App from './App';

// CSS
import './index.css';
import './tachyons.css';


/** ------------------------------------------------------------------------ **
 * Entry point.
 ** ------------------------------------------------------------------------ */

function onReactLoaded() {
  console.log('React has loaded.');
}

const rootEl = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl,  // Insert into DOM here
  onReactLoaded,
);
