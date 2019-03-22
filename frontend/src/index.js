import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from "react-router-dom";
import './Styles.css';
import Home from './Pages/Home/Home';
import Admin from "./Pages/Admin/Admin";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={Home}/>
            <Route exact path="/hestAdmin" component={Admin}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root')
);
