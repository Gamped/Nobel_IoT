import React from "react";
import {socket} from "../../Socket/Socket"
import "../Pages.css"
import "./Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel remote",
        }
    }

    // Functions for sending commands to backend
    BeamerOn = () => {socket.emit('beamerOn');}
    BeamerOff = () => {socket.emit('beamerOff');}
    ChannelChromecast = () => {socket.emit('channelChromecast');}
    ChannelHDMI = () => {socket.emit('channelHDMI');}

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <div className="Home_TitleBox">
                        <h1 className="customText_w_big">{this.state.Title}</h1>
                    </div>

                    <div className="Home_BtnBox">
                        <div className="Home_BTN_Row">
                            <button onClick={this.BeamerOn} 
                                    className="Home_BTN_Left std_BTN customText_w">
                                    Switch beamer ON
                            </button>
                            <button onClick={this.BeamerOff} 
                                    className="Home_BTN_Right std_BTN customText_w">
                                    Switch beamer OFF
                            </button>
                        </div>

                        <div className="Home_BTN_Row">
                            <button onClick={this.ChannelChromecast} 
                                    className="Home_BTN_Left std_BTN customText_w">
                                    Change to Chromecast
                            </button>
                            <button onClick={this.ChannelHDMI} 
                                    className="Home_BTN_Right std_BTN customText_w">
                                    Change to HDMI
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;