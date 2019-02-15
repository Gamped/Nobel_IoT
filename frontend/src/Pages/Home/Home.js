import React from "react";
import {socket} from "../../Socket/Socket"
import {updateBeamerState, updateChannelState} from "../../Socket/WsUpdaters"
import "../Pages.css"
import "./Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel mediacontrol",
            BeamerState: "Unknown",
            ChannelState: "Unknown",
        }

        // Get the current state
        socket.emit('getBeamerState');
        socket.emit('getChannelState');

        // Functions for updating the state
        updateBeamerState((err, BeamerState) => this.setState({BeamerState}));
        updateChannelState((err, ChannelState) => this.setState({ChannelState}));
    }

    ToggleBeamer = () => {socket.emit('toggleBeamer');}

    ToggleChannel = () => {socket.emit('toggleChannel');}

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <div className="Home_TitleBox">
                        <h1 className="customText_w_big">{this.state.Title}</h1>
                    </div>

                    <div className="Home_BtnBox">
                        <button onClick={this.ToggleBeamer} 
                                className="Home_BTN std_BTN customText_w">
                                Turn {this.state.BeamerState} beamer
                        </button>
                        <button onClick={this.ToggleChannel} 
                                className="Home_BTN std_BTN customText_w">
                                Change channel to {this.state.ChannelState}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;