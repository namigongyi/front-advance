const http = require("http")

//creare a local server to receive data from 
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(`<h1>Hello World!</h1>`)
})
server.listen(8080)