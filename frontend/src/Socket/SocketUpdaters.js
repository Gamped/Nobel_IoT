import {socket} from "./Socket"

function updatePassFeedback(info){
    socket.on('updatePassFeedback',  passFeedback => info(null, passFeedback));
}

export {updatePassFeedback}