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



const PUBLIC_KEY = 'pk_live_51L2flsALU69ZaX0XllVABBBVTR6CfRL0KmmmtuaVHsxumNCKGv9Rjaheg9HONtPPrE9PrEMoousMnNhydRsZD9sp00Efub88az'
const stripeTestPromise = loadStripe(PUBLIC_KEY)

root.render(

  
    <RecoilRoot>
    <Elements stripe={stripeTestPromise}>
    <App/>
    </Elements>
    </RecoilRoot>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();