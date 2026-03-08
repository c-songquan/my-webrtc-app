const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer'); // 必须有这一行

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// 这里的 /peerjs 是给前端连接用的接口
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp',
    allow_discovery: true // 开启大厅发现功能
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
