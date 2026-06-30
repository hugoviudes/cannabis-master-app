import './storagePolyfill.js'; // DEBE cargarse antes que App, ya que App usa window.storage al montar
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registro del service worker para soporte offline + instalación como PWA.
// import.meta.env.BASE_URL respeta automáticamente la subcarpeta configurada
// en vite.config.js (necesario para GitHub Pages, que publica en /nombre-repo/).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(err => {
      console.error('Error registrando service worker:', err);
    });
  });
}
