import ReactDOM from 'react-dom/client'
import './index.css'
import { initializeApp } from 'firebase/app';
import { config } from './config/config.ts';
import { Auth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.ts';

const app = initializeApp(config.firebaseConfig);
export const firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
