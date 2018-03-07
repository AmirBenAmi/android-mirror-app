const path = require('path');
const express = require('express');
const io = require('socket.io')();
// const http = require('http');
const app = express();
const publicPath = path.join(__dirname, '..', 'public','dist');
const port = process.env.PORT || 3000;

// let server = http.createServer(app);
// let io = socketIO(server);

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});

/////////////////////////////////

const Promise = require('bluebird')
const fs = require('fs')
const adb = require('adbkit')
const client = adb.createClient()


io.on('connection', (socket) => {
  let fileCounter = 0;
  let prevFileCounter = 0;
  const publicPath = path.resolve( __dirname, '../', 'public', 'dist');
  let filePath = '';
  //////////////////////////////////
    client.trackDevices()
      .then(function(tracker) {
        tracker.on('add', function(device) {
          console.log('Device %s was plugged in', device.id)
        })
        tracker.on('remove', function(device) {
          console.log('Device %s was unplugged', device.id);
        })
        tracker.on('end', function() {
          console.log('Tracking stopped')
        })
      })
      .catch(function(err) {
        console.error('Something went wrong:', err.stack)
      });
    //////////////////////////////////////
    const createImage = (deviceID) => {
      console.log('creating image');
      client.screencap(deviceID, (err, data) => {
        if(err){
          console.log('error:' ,err);
          return
        };
        let bufs = [];
        data.on('data', function(chunk){
            bufs.push(chunk);
        });
        data.on('end', function(){
            prevFileCounter = fileCounter;
            fileCounter++;
            let buffer = new Buffer.concat(bufs);
            filePath = `./out${fileCounter}.png`;
            // filePath = path.join( publicPath, `out${fileCounter}.png`);
            let out = fs.createWriteStream(filePath);
            out.write(buffer);
            out.end();
            socket.emit('newImage', filePath, buffer);
            if(prevFileCounter > 0){
              // filePath = path.join( publicPath, `out${prevFileCounter}.png`);
            // fs.unlinkSync(`./out${prevFileCounter}.png`);
              filePath = `./out${prevFileCounter}.png`;
              fs.unlink(filePath, (err) => {
                if(err) {
                  console.log('file cannot be deleted!', filePath);
                }
              });
            }
        });
        
      });
    };
    //////////////////////////////////////////////
    client.listDevices().then((devices) => {
      return devices[0];
    }).then((device) => {
      if(!device){
        return 
      };
      let count = 0;
      setInterval(() => {
        createImage(device.id);
      }, 600);
    });
//////////////////////////////////////////////

    socket.on('disconnect', function(){});
});

io.listen(8000);
 





 