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
                        <h1 className="Home_InfoText customText_w_big">{this.state.Title}</h1>
                    </div>

                    <div className="Home_BtnBox">
                        <div className="row Home_BTN_Row">
                            <div className="col-sm">
                                <button onClick={this.BeamerOn} 
                                        type="button"
                                        className="btn btn-dark Home_BTN std_BTN customText_w">
                                        Projector ON
                                </button>
                            </div>
                            <div className="col-sm">
                                <button onClick={this.BeamerOff} 
                                        type="button"
                                        className="btn btn-dark Home_BTN std_BTN customText_w">
                                        Projector OFF
                                </button>
                            </div>
                        </div>

                        <div className="row Home_BTN_Row">
                            <div className="col-sm">
                                <button onClick={this.ChannelChromecast} 
                                        type="button"
                                        className="btn btn-dark Home_BTN std_BTN customText_w">
                                        Chromecast
                                </button>
                            </div>
                            <div className="col-sm">
                                <button onClick={this.ChannelHDMI} 
                                        type="button"
                                        className="btn btn-dark Home_BTN std_BTN customText_w">
                                        HDMI
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Home;