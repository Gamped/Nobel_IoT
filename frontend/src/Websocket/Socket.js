import openSocket from 'socket.io-client';

// This ensures that all files work with the same socket,
// as long as this is included in their file
const socket = openSocket('http://localhost:8000');

export {socket};