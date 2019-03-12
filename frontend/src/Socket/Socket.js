import openSocket from 'socket.io-client';

// This ensures that all files work with the same socket
const socket = openSocket('http://localhost:8000');

export {socket};