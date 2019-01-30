import React from "react";
import openSocket from 'socket.io-client';
import {socket} from "../../Websocket/Socket"
import {updateBeamerState} from "../../Websocket/WsUpdaters"
import "../Pages.css"
import "./Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel IoT",
            BeamerState: "unknown",
        }

        // Functions for updating the state
        updateBeamerState((err, BeamerState) => this.setState({BeamerState}));
    }

    ToggleBeamer = (e) => {
        socket.emit('toggleBeamer');
    }

    render(){
        socket.emit('getBeamerState');
        
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <h1 className="customText_w_medium">{this.state.Title}</h1>
                    <button onClick={this.ToggleBeamer} 
                            className="Home_BTN dark_BTN customText_w_medium">
                            Toggle beamer: Currently {this.state.BeamerState}
                    </button>
                </div>
            </div>
        );
    }
}    
export default Home;