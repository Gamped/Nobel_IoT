const debug = true;
const io = require('socket.io')();
const port = 8000;
var beamerState = true; // <- This is just for mock-data purpose

// Listen on the assigned port
io.listen(port);
console.log('Linstening on port: ', port);

// Handles clients connecting & the different events
io.on('connection', (socket) => {
    if (debug){console.log('Connection started')};

    // Disconect
    socket.on('disconnect', function(){
        if (debug){console.log('Connection disconnected')}
    });

    /* -------------- BEAMER -------------- */
    // Change state of beamer
    socket.on('toggleBeamer', function(){
        if (beamerState === true){
            beamerState = false;
        } else {beamerState = true;}

        io.sockets.emit('updateBeamerState', beamerState ? "on" : "off");

        if (debug){console.log('Beamer toggled to: ', beamerState)};
    });

    socket.on('getBeamerState', function(){
        socket.emit('updateBeamerState', beamerState ? "on" : "off");
    });

    /* ------------------------------------ */
});

