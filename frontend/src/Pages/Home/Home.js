import React from "react";
import openSocket from 'socket.io-client';
import "../Pages.css"
import "./Home.css"

const socket = openSocket('http://localhost:8000');

function updateBeamerState(info){
    socket.on('updateBeamerState',  BeamerState => info(null, BeamerState));
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        
        updateBeamerState((err, BeamerState) => this.setState({BeamerState}));

        // Default state:
        this.state = {
            Title: "Nobel IoT",
            BeamerState: "unknown",
        }
    }

    ToggleBeamer = (e) => {
        socket.emit('toggleBeamer');
    }

    render(){
        socket.emit('getBeamerState');
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <h1 className="customText_w_medium">{this.state.Title} : {this.state.timestamp}</h1>
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