const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 托管当前目录下的静态文件
app.use(express.static(__dirname));

// 访问根目录时返回 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
