import openSocket from 'socket.io-client';

// This ensures that all files work with the same socket
const socket = openSocket('https://'+window.location.hostname+':8000');
// If testing locally use "const socket = openSocket('localhost:8000');"

export {socket};