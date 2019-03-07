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
                        <div className="Home_BTN_Row">
                            <button onClick={this.ToggleBeamer} 
                                    className="Home_BTN_Left std_BTN customText_w">
                                    Turn ON beamer
                            </button>
                            <button onClick={this.ToggleBeamer} 
                                    className="Home_BTN_Right std_BTN customText_w">
                                    Turn OFF beamer
                            </button>
                        </div>

                        <div className="Home_BTN_Row">
                            <button onClick={this.ToggleChannel} 
                                    className="Home_BTN_Left std_BTN customText_w">
                                    Change channel to Chromecast
                            </button>
                            <button onClick={this.ToggleChannel} 
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