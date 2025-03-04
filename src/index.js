import React from 'react';
import ReactDOM from 'react-dom/client'; // ใช้ react-dom/client แทน react-dom
import App from './App.js'; // อย่าลืม .js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
