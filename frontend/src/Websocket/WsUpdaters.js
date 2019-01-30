import {socket} from "./Socket"

function updateBeamerState(info){
    socket.on('updateBeamerState',  BeamerState => info(null, BeamerState));
}

function updateChannelState(info){
    socket.on('updateChannelState', ChannelState => info(null, ChannelState));
}

export {updateBeamerState, updateChannelState}