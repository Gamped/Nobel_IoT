import {socket} from "./Socket"

function updateBeamerState(info){
    socket.on('updateBeamerState',  BeamerState => info(null, BeamerState));
}

function updateChannelState(info){
    socket.on('updateChannelState', ChannelState => info(null, ChannelState));
}

function updateSoundState(info){
    socket.on('updateSoundState', SoundState => info(null, SoundState));
}

export {updateBeamerState, updateChannelState, updateSoundState}