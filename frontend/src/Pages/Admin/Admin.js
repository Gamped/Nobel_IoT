import React from "react";
import {socket} from "../../Websocket/Socket"
import {updateBeamerState, updateChannelState, updateSoundState} from "../../Websocket/WsUpdaters"
import "../Pages.css";
import "./Admin.css";

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel IoT: Admin",
            BeamerState: "Unknown",
            ChannelState: "Unknown",
            AdminPassword: "",
            SoundState: "Unknown",
        }

        // Get the current state
        socket.emit('getBeamerState');
        socket.emit('getChannelState');
        socket.emit('getSoundState');

        // Functions for updating the state
        updateBeamerState((err, BeamerState) => this.setState({BeamerState}));
        updateChannelState((err, ChannelState) => this.setState({ChannelState}));
        updateSoundState((err, SoundState) => this.setState({SoundState}));
    }

    ToggleBeamer = (e) => {
        socket.emit('toggleBeamer');
    }

    ToggleChannel = (e) => {
        socket.emit('toggleChannel');
    }

    ToggleSound = (e) => {
        socket.emit('toggleSound', this.state.AdminPassword);
    }

    OnChange = (e) => {
        this.setState({...this, AdminPassword: e.target.value});
    }

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <div className="Admin_TitleBox">
                        <h1 className="customText_w_big">{this.state.Title}</h1>
                    </div>

                    <div className="Admin_BtnBox">
                        <h1 className="Admin_InfoText customText_w">Password need to be entered correctly for the system to accept mute/unmute</h1>
                        <input  type="Password" 
                                className="Admin_PassForm customText_b" 
                                placeholder="Enter admin password" 
                                onChange={this.OnChange} 
                                required/>

                        <button onClick={this.ToggleBeamer} 
                                className="Admin_BTN dark_BTN customText_w">
                                Turn beamer {this.state.BeamerState}
                        </button>

                        <button onClick={this.ToggleChannel} 
                                className="Admin_BTN dark_BTN customText_w">
                                Change channel to {this.state.ChannelState}
                        </button>

                        <button onClick={this.ToggleSound} 
                                className="Admin_BTN dark_BTN customText_w">
                                {this.state.SoundState}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}    
export default Admin;