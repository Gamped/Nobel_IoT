const debug = true;
const io = require('socket.io')();
const port = 8000;
var beamerState = true; // <- This is just for mock-data purpose
var channelState = true; // <- This is just for mock-data purpose
var soundState = true; // <- This is just for mock-data purpose

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

        io.sockets.emit('updateBeamerState', beamerState ? "off" : "on");

        if (debug){console.log('Beamer toggled to: ', beamerState)};
    });

    socket.on('getBeamerState', function(){
        socket.emit('updateBeamerState', beamerState ? "off" : "on");
    });

    /* ------------------------------------ */

    /* ------------- CHANNELS ------------- */
    // Change the channel between chromecast and HDMI
    socket.on('toggleChannel', function(){
        if (channelState === true){
            channelState = false;
        } else {channelState = true;}

        io.sockets.emit('updateChannelState', channelState ? "Chromecast" : "HDMI");

        if (debug){console.log('Channel toggled to: ', channelState ? "HDMI" : "Chromecast")};
    });

    socket.on('getChannelState', function(){
        socket.emit('updateChannelState', channelState ? "Chromecast" : "HDMI");
    });

    /* ------------------------------------ */

    /* -------------- VOLUME -------------- */
    // Change the channel between mute/unmute
    // But only if password is valid
    socket.on('toggleSound', function(pass){
        // TEMP HARDCODED (md5) PASSWORD - this will be  need to be changed to improve security;)
        if (pass === "b24ecc40cef177b0334c4cfa91f94d28"){
            if (soundState === true){
                soundState = false;
            } else {soundState = true;}
    
            io.sockets.emit('updateSoundState', soundState ? "Mute" : "Unmute");
    
            if (debug){console.log('Channel toggled to: ', soundState ? "Unmute" : "Mute")};
        } else {
            // Invalid password, so let user know
            console.log("Admin login attempt: Wrong password")
            socket.emit('updateSoundState', "INVALID PASSWORD");
        }
    });
        
    socket.on('getSoundState', function(){
        socket.emit('updateSoundState', soundState ? "Mute" : "Unmute");
    });

    /* ------------------------------------ */
});

