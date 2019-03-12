const debug = true;

const io = require('socket.io')();
const port = 8000;

const servicename = "dk.nobelnet.mediacontrol";
const receiverObjectPath = "/dk/nobelnet/mediacontrol/receiver";
const receiverInterface = "dk.nobelnet.mediacontrol.receiver";

const beamerObjectPath = "/dk/nobelnet/mediacontrol/projector"; 
const beamerInterface = "dk.nobelnet.mediacontrol.projector";

const DBus = require('dbus');
const bus = DBus.getBus('system');

const adminPass = "16621a449968824b63a8210c42cded23" // This is only temp and result of salted md5

/* ============= D-BUS cmd's ============= */

// Send a command to the beamer over DBus
function BeamerSend(cmd) {
    bus.getInterface(servicename, beamerObjectPath, beamerInterface, function(err, interface){
        if (err) {
            throw new Error("Could not connect to beamer");
        } else {interface.SendCommand(cmd);}
    });
}

// Send a command to the reciever over DBus
function RecieverSend(cmd) {
    bus.getInterface(servicename, receiverObjectPath, receiverInterface, function(err, interface){
        if (err) {
            throw new Error("Could not connect to reciever");
        } else {interface.SendCommand(cmd);}
    });
}

// Select input for the reciever over DBus
function RecieverInput(input) {
    bus.getInterface(servicename, receiverObjectPath, receiverInterface, function(err, interface){
        if (err) {
            throw new Error("Could not connect to reciever");
        } else {interface.SelectInput(input);}
    });
}
/* ======================================= */

/* ============== Socket.io ============== */

// Listen on the assigned port
io.listen(port);
console.log('Linstening on port: ', port);

// Handles clients connecting & the different events
io.on('connection', (socket) => {
    if (debug){console.log(new Date(), 'Connection started')};

    // Disconect
    socket.on('disconnect', function(){
        if (debug){console.log(new Date(), 'Connection disconnected')}
    });

    /* -------------- BEAMER -------------- */
    // Change state of beamer
    socket.on('beamerOn', function(){
        if (debug){console.log(new Date(), "Turned ON beamer")}
        BeamerSend("PowerOn");
    });

    socket.on('beamerOff', function(){
        if (debug){console.log(new Date(), "Turned OFF beamer")}
        BeamerSend("PowerOff");
    });
    /* ------------------------------------ */

    /* ------------- CHANNELS ------------- */
    // Change the channel between chromecast and HDMI
    socket.on('channelHDMI', function(){
        if (debug){console.log(new Date(), "Channel changed to HDMI")}
        RecieverInput("wallhdmi");
    });

    socket.on('channelChromecast', function(){
        if (debug){console.log(new Date(), "Channel changed to Chromecast")}
        RecieverInput("chromecast");
    });
    /* ------------------------------------ */

    /* -------------- VOLUME -------------- */
    // Change the channel between mute/unmute
    // But only if password is valid
    socket.on('mute', function(pass){
        // TEMP HARDCODED (md5) PASSWORD - this will be  need to be changed to improve security;)
        if (pass === adminPass){
            if (debug){console.log(new Date(), 'Admin MUTED')};        
            RecieverSend("Mute");
            socket.emit('updatePassFeedback', "Correct password :D");
        } else {
            // Invalid password, so let user know + log
            console.log(new Date(), 'Admin login attempt: Wrong password!');
            socket.emit('updatePassFeedback', "INVALID PASSWORD!");
        }
    });

    socket.on('unmute', function(pass){
        // TEMP HARDCODED (md5) PASSWORD - this will be  need to be changed to improve security;)
        if (pass === adminPass){
            if (debug){new Date(), console.log('Admin UNMUTED')};        
            RecieverSend("Unmute");
            socket.emit('updatePassFeedback', "Correct password :D");
        } else {
            // Invalid password, so let user know + log
            console.log(new Date(), 'Admin login attempt: Wrong password!');
            socket.emit('updatePassFeedback', "INVALID PASSWORD!");
        }
    });
    
    // When a client first requests password feedback
    socket.on('getPassFeedback', function(){
        socket.emit('updatePassFeedback', "You need the correct password to mute/unmute");
    });
    /* ------------------------------------ */
});
/* ======================================= */