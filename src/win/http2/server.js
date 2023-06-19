const http = require("http")
const server =http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(`<h1>Hello World!</h1>`)
})
server.listen(8080)