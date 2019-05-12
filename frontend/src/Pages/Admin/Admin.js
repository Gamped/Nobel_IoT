import React from "react";
import {socket} from "../../Socket/Socket"
import {updatePassFeedback} from "../../Socket/SocketUpdaters"
import "../Pages.css";
import "./Admin.css";
const md5 = require('js-md5');

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel remote: Admin",
            AdminPassword: "",
            passFeedback: "Not connected to backend!",
        }

        // Functions to get password feedback text from backend
        socket.emit('getPassFeedback');
        updatePassFeedback((err, passFeedback) => this.setState({passFeedback}));
    }

    // Functions for sending commands to backend
    BeamerOn = () => {socket.emit('beamerOn');}
    BeamerOff = () => {socket.emit('beamerOff');}
    ChannelChromecast = () => {socket.emit('channelChromecast');}
    ChannelHDMI = () => {socket.emit('channelHDMI');}

    // Encrypt password using md5 before sending
    Mute = () => {
        var md5Pass = md5(this.state.AdminPassword + "saltyNobel");
        socket.emit('mute', md5Pass);
    }
    Unmute = () => {
        var md5Pass = md5(this.state.AdminPassword + "saltyNobel");
        socket.emit('unmute', md5Pass);
    }

    OnPassChange = (e) => {this.setState({...this, AdminPassword: e.target.value});}

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <div className="Admin_TitleBox">
                        <h1 className="customText_w_big MoveTop">{this.state.Title}</h1>
                    </div>

                    <div className="Admin_ContentBox">
                        <div className="row">
                            <div className="col-xl">
                                <h1 className="Admin_InfoText customText_w">{this.state.passFeedback}</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl">
                                <input  type="Password" 
                                    className="Admin_PassForm customText_b" 
                                    placeholder="Enter admin password" 
                                    onChange={this.OnPassChange} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="row no-gutters Admin_BTN_Row">
                            <div className="col">
                                <button onClick={this.BeamerOn} 
                                        className="btn btn-dark Admin_BTN dark_BTN customText_w">
                                        Projector ON
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={this.BeamerOff} 
                                        className="btn btn-dark Admin_BTN dark_BTN customText_w">
                                        Projector OFF
                                </button>
                            </div>
                        </div>

                        <div className="row no-gutters Admin_BTN_Row">
                            <div className="col">
                                <button onClick={this.ChannelHDMI} 
                                        className="btn btn-dark Admin_BTN dark_BTN customText_w">
                                        Change to HDMI
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={this.ChannelChromecast} 
                                        className="btn btn-dark Admin_BTN dark_BTN customText_w">
                                        Change to Chromecast
                                </button>
                            </div>
                        </div>

                        <div className="row no-gutters Admin_BTN_Row">
                            <div className="col">
                                <button onClick={this.Mute} 
                                        className="btn btn-dark Admin_BTN dark_BTN customText_w">
                                        Mute
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={this.Unmute} 
                                        className="btn btn-dark Admin_BTN dark_BTN customText_w">
                                        Unmute
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
    
export default Admin;