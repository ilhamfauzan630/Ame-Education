import React from 'react';                        //library
import ReactDOM from 'react-dom';                 //library untuk berpindah pages
import App from './App';                          //memanggil fungsi app dari app.js
import "./index.css";                             //memanggil file .css
import { BrowserRouter } from 'react-router-dom'; //untuk digunakan nanti  pindah page 
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <App />                                      {/* Memanggil fungsi App */}
  </BrowserRouter>,
  document.getElementById('root')
);

