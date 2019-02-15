const debug = false;

const io = require('socket.io')();
const port = 8000;

var beamerState = true; // <- This is just for mock-data purpose
var channelState = true; // <- This is just for mock-data purpose
var soundState = true; // <- This is just for mock-data purpose

const servicename = "dk.nobelnet.mediacontrol";
const receiverObectPath = "/dk/nobelnet/mediacontrol/receiver";
const receiverInterface = "dk.nobelnet.mediactontrol.receiver";
const beamerObectPath = "/dk/nobelnet/mediacontrol/projector"; 
const beamerInterface = "dk.nobelnet.mediacontrol.projector";

const DBus = require('dbus');
const service = DBus.registerService('session', servicename);
const bus = DBus.getBus('session');

// Send a command to the beamer over DBus
function BeamerSend(cmd) {
    bus.getInterface(servicename, beamerObectPath, beamerInterface, function(err, interface){
        if (err) {
            throw new Error("Could not connect to beamer");
        } else {
            interface.SendCommand(cmd);
        }
    });
}

// Send a command to the reciever over DBus
function RecieverSend(cmd) {
    bus.getInterface(servicename, receiverObectPath, receiverInterface, function(err, interface){
        if (err) {
            throw new Error("Could not connect to reciever");
        } else {
            interface.SendCommand(cmd);
        }
    });
}

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
            BeamerSend("PowerOff");
        } else {
            beamerState = true;
            BeamerSend("PowerOn");
        }

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
            RecieverSend("! TO BE SET !");
        } else {
            channelState = true;
            RecieverSend("! TO BE SET !");
        }

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
        if (pass === "16621a449968824b63a8210c42cded23"){
            if (soundState === true){
                soundState = false;
                RecieverSend("! TO BE SET !");
            } else {
                soundState = true;
                RecieverSend("Hurlumh! TO BE SET !ej");
            }
    
            io.sockets.emit('updateSoundState', soundState ? "Mute" : "Unmute");
    
            if (debug){console.log('Channel toggled to: ', soundState ? "Unmute" : "Mute")};
        } else {
            // Invalid password, so let user know
            console.log(new Date(), 'Admin login attempt: Wrong password!');
            socket.emit('updateSoundState', "INVALID PASSWORD");
        }
    });
        
    socket.on('getSoundState', function(){
        socket.emit('updateSoundState', soundState ? "Mute" : "Unmute");
    });

    /* ------------------------------------ */
});

