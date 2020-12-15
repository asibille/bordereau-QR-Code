const express = require('express');
const app = express();
const port = 8080;

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

app.use(express.static('public'));
app.use(express.static('node_modules/qrcode/build'));

app.post('/convert/html', (req, res) => {
  proxy.web(req, res, {target: 'http://localhost:3000'});
});

app.listen(port, () => {
  console.log(`bordereau-qr-code app listening at http://localhost:${port}`);
});