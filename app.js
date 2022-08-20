var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
const router  = require('express').Router();
const DataTemp = require('./models/DataTemp')
const { $where } = require('./models/DataTemp');

const express = require('express')
const app2 = express()



var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM6',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
});

router.route('/create').post(function (req, res){
    const temp = new DataTemp(data);
    temp.save()
      .then(temp => {
        res.json('temp working');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  })

module.exports = router;