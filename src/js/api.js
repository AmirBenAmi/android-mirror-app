import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

let counter = 0;
const subscribeForImage = (cb) => {
    socket.on('newImage', (filePath, buffer) => {
        counter++;
        cb(counter, filePath, buffer);
        
    });

}
export default subscribeForImage;


