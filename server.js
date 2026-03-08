const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// 托管前端静态页面
app.use(express.static(__dirname));

// 设置 PeerServer 路由
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/terminal',
    allow_discovery: true,
    proxied: true // 在 Render 这种代理环境下建议开启
});

// 将 Peer 服务挂载到 /p2p 路径下
app.use('/p2p', peerServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 错误处理，防止伺服器崩溃
peerServer.on('error', (err) => {
    console.error('PeerServer Error:', err);
});

server.listen(port, () => {
    console.log(`[OK] 系统已启动，端口: ${port}`);
});
