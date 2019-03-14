import openSocket from 'socket.io-client';

// This ensures that all files work with the same socket
const socket = openSocket('http://nobelix.nobelnet.dk:8000');
// If testing locally use "const socket = openSocket('localhost:8000');"

export {socket};