import React from "react";
import "../Pages.css"
import "./Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "Nobel IoT",
        }
    }

    TurnOnBeamer = (e) => {
        this.setState({...this, Title: "haha"});
    }

    render(){
        return(
            <div className="PageBorder">
                <div className="Margin_2">
                    <h1 className="customText_w_medium">{this.state.Title}</h1>
                    <button onClick={this.TurnOnBeamer} className="Home_BTN dark_BTN customText_w_medium">Beamer</button>
                </div>
            </div>
        );
    }
}    

export default Home;