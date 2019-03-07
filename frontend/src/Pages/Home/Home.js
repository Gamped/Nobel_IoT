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
    beamerOn = () => {socket.emit('beamerOn');}
    beamerOff = () => {socket.emit('beamerOff');}
    channelChromecast = () => {socket.emit('channelChromecast');}
    channelHDMI = () => {socket.emit('channelHDMI');}

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <div className="Home_TitleBox">
                        <h1 className="customText_w_big">{this.state.Title}</h1>
                    </div>

                    <div className="Home_BtnBox">
                        <div className="Home_BTN_Row">
                            <button onClick={this.beamerOn} 
                                    className="Home_BTN_Left std_BTN customText_w">
                                    Turn ON beamer
                            </button>
                            <button onClick={this.beamerOff} 
                                    className="Home_BTN_Right std_BTN customText_w">
                                    Turn OFF beamer
                            </button>
                        </div>

                        <div className="Home_BTN_Row">
                            <button onClick={this.channelChromecast} 
                                    className="Home_BTN_Left std_BTN customText_w">
                                    Change channel to Chromecast
                            </button>
                            <button onClick={this.channelHDMI} 
                                    className="Home_BTN_Right std_BTN customText_w">
                                    Change channel to HDMI
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;