import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './satoshi.css';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </React.StrictMode>
);
