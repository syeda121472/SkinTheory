import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Don't forget this line!

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={1000} />
  </StrictMode>
);
