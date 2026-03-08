const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// 让你的网站能显示网页
app.use(express.static(__dirname));

// 核心：在你自己的域名上开启通讯功能
const peerServer = ExpressPeerServer(server, {
    path: '/myapp',
    allow_discovery: true // 开启这个，你才能看到谁在线
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
    console.log(`伺服器正在运行`);
});
