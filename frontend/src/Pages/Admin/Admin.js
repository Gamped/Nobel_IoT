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
    beamerOn = () => {socket.emit('beamerOn');}
    beamerOff = () => {socket.emit('beamerOff');}
    channelChromecast = () => {socket.emit('channelChromecast');}
    channelHDMI = () => {socket.emit('channelHDMI');}

    ToggleSound = (e) => {
        // Encrypt password using md5 before sending
        var md5Pass = md5(this.state.AdminPassword + "saltyNobel");
        socket.emit('toggleSound', md5Pass);
    }

    OnChange = (e) => {this.setState({...this, AdminPassword: e.target.value});}

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <div className="Admin_TitleBox">
                        <h1 className="customText_w_big">{this.state.Title}</h1>
                    </div>

                    <div className="Admin_BtnBox">
                        <h1 className="Admin_InfoText customText_w">{this.state.passFeedback}</h1>
                        
                        <input  type="Password" 
                                className="Admin_PassForm customText_b" 
                                placeholder="Enter admin password" 
                                onChange={this.OnChange} 
                                required
                        />

                        <div className="Admin_BTN_Row">
                            <button onClick={this.beamerOn} 
                                    className="Admin_BTN_Left dark_BTN customText_w">
                                    Switch beamer ON
                            </button>
                            <button onClick={this.beamerOff} 
                                    className="Admin_BTN_Right dark_BTN customText_w">
                                    Switch beamer OFF
                            </button>
                        </div>

                        <div className="Admin_BTN_Row">
                            <button onClick={this.channelHDMI} 
                                    className="Admin_BTN_Left dark_BTN customText_w">
                                    Change to HDMI
                            </button>
                            <button onClick={this.channelChromecast} 
                                    className="Admin_BTN_Right dark_BTN customText_w">
                                    Change to Chromecast
                            </button>
                        </div>

                        <div className="Admin_BTN_Row">
                            <button onClick={this.ToggleSound} 
                                    className="Admin_BTN_Left dark_BTN customText_w">
                                    Mute
                            </button>
                            <button onClick={this.ToggleSound} 
                                    className="Admin_BTN_Right dark_BTN customText_w">
                                    Unmute
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
    
export default Admin;