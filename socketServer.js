const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8001;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })
const Buffer = require('buffer');

wss.on('connection', function connection(ws) {
    // once connected to the websocket 
    ws.on('message', function incoming(data, isBinary) {
        // filter through the clients and check the status of their connection
        wss.clients.forEach(function each(client) {
            // if their websocket connection is open 
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                // then I want to send them some data
                console.log({binary: isBinary})
                client.send(data, {binary: isBinary});
            } 
        })
    })
})

server.listen(port, function() {
    console.log('The websocket server is up and running at port:', port)
})
module.exports = Buffer;
module.exports = WebSocket;