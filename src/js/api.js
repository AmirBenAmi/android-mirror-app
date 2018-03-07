import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const subscribeForImage = (cb) => {
    socket.on('newImage', (filePath, buffer) => {
        cb(filePath, buffer);
        
    });

}
export default subscribeForImage;


