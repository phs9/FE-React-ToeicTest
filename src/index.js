import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
//import './dist/css/style.css';
import './dist/css/app.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyAlert from "./components/MyAlert";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyAlert/>
        <App/>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
