import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
    <App />
  </React.StrictMode>,
    document.getElementById('root')
);
