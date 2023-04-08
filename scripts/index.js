const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const NewPostListen = require("./listener")
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);
const port = 5000
let books= []

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/sample/put/data', function(req, res) {
  console.log('receiving data ...');
  console.log('body is ',req.body);
  res.send(req.body);
});
app.get('/', function(req, res) {
  console.log('receiving data ...');
  console.log('body is ',req.body);
  res.send(req.body);
});



app.listen(port, () => {
  console.log(`Post app listening on port ${port}`)
})
