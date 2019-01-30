import {socket} from "./Socket"

function updateBeamerState(info){
    socket.on('updateBeamerState',  BeamerState => info(null, BeamerState));
}

export {updateBeamerState}