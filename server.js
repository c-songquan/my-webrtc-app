const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// 这是你自己的信令中心，开启后就不再报 404
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/chatapp',
    allow_discovery: true // 必须为 true，在线列表才会出来
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
    console.log(`服务器已在端口 ${port} 启动`);
});
