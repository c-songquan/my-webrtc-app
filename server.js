const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// 路径只用 /myapp，简单直接
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/',
    allow_discovery: true
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
    console.log(`[OK] 端口 ${port} 已启动`);
});
