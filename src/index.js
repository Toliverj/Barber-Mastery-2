import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
const root = ReactDOM.createRoot(document.getElementById('root'));



const PUBLIC_KEY = 'pk_test_51L2flsALU69ZaX0X7eFgDyTh3M0MZEsTh7P6Mh2Gh4w3pHv5rOhVll3246GmR7HKeGPfie4cLXtZuhPH2Myq08b600fnw4BChs'
const stripeTestPromise = loadStripe(PUBLIC_KEY)

root.render(

  <React.StrictMode>
    <RecoilRoot>
    <Elements stripe={stripeTestPromise}>
    <App/>
    </Elements>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();