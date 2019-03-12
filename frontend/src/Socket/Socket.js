import openSocket from 'socket.io-client';

// This ensures that all files work with the same socket
const socket = openSocket('http://nobelix.nobelnet.dk:8000');

export {socket};