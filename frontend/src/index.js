import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from "react-router-dom";
import './Styles.css';
import Home from './Pages/Home/Home';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={Home}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root')
);
