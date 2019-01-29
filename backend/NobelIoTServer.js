// Based upon: https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34

const io = require('socket.io')();
const port = 8000;

// Listen on port
io.listen(port);
console.log('Linstening on port: ', port);

// Handles clients connecting
io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('Client is subscribing to timer with interval ', interval);
        setInterval ( () =>  {
            client.emit('timer', new Date());
        }, interval);
    });
});
