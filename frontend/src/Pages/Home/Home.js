import React from "react";
import openSocket from 'socket.io-client';
import "../Pages.css"
import "./Home.css"

const socket = openSocket('http://localhost:8000');

function subscribeToTimer( cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp 
          }));
        this.state = {
            Title: "Nobel IoT",
            timestamp: "none",
        }
    }

    TurnOnBeamer = (e) => {
        this.setState({...this, Title: "haha"});
        
    }

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <h1 className="customText_w_medium">{this.state.Title} : {this.state.timestamp}</h1>
                    <button onClick={this.TurnOnBeamer} className="Home_BTN dark_BTN customText_w_medium">Beamer</button>
                </div>
            </div>
        );
    }
}    
export { subscribeToTimer }
export default Home;