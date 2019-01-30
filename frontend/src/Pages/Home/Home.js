import React from "react";
import {socket} from "../../Websocket/Socket"
import {updateBeamerState} from "../../Websocket/WsUpdaters"
import "../Pages.css"
import "./Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: "Nobel IoT",
            BeamerState: "unknown",
        }

        // Get the current state
        socket.emit('getBeamerState');

        // Functions for updating the state
        updateBeamerState((err, BeamerState) => this.setState({BeamerState}));
    }

    ToggleBeamer = (e) => {
        socket.emit('toggleBeamer');
    }

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
                                Toggle beamer: Currently {this.state.BeamerState}
                        </button>
                        <button onClick={this.ToggleBeamer} 
                                className="Home_BTN std_BTN customText_w">
                                Toggle beamer: Currently {this.state.BeamerState}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}    
export default Home;