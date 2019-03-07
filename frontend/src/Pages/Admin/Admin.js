import React from "react";
import {socket} from "../../Socket/Socket"
import {updateBeamerState, updateChannelState, updateSoundState} from "../../Socket/WsUpdaters"
import "../Pages.css";
import "./Admin.css";
const md5 = require('js-md5');

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel remote: Admin",
            AdminPassword: "",
        }

        //TODO: Change these to
        socket.emit('getSoundState');
        updateSoundState((err, SoundState) => this.setState({SoundState}));
    }

    ToggleBeamer = (e) => {socket.emit('toggleBeamer');}
    ToggleChannel = (e) => {socket.emit('toggleChannel');}

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
                        <h1 className="Admin_InfoText customText_w">You need the correct password to mute/unmute</h1>
                        
                        <input  type="Password" 
                                className="Admin_PassForm customText_b" 
                                placeholder="Enter admin password" 
                                onChange={this.OnChange} 
                                required/>

                        <div className="Admin_BTN_Row">
                            <button onClick={this.ToggleBeamer} 
                                    className="Admin_BTN_Left dark_BTN customText_w">
                                    Turn ON beamer
                            </button>
                            <button onClick={this.ToggleBeamer} 
                                    className="Admin_BTN_Right dark_BTN customText_w">
                                    Turn OFF beamer
                            </button>
                        </div>

                        <div className="Admin_BTN_Row">
                            <button onClick={this.ToggleChannel} 
                                    className="Admin_BTN_Left dark_BTN customText_w">
                                    Change channel to HDMI
                            </button>
                            <button onClick={this.ToggleChannel} 
                                    className="Admin_BTN_Right dark_BTN customText_w">
                                    Change channel to Chromecast
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