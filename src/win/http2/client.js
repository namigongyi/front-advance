const net = require('node:net')
const Response = require("./response")
let res = ''
const client = net.createConnection(({ port: 8080, }), () => {
    // console.log('client is work')
    client.write("GET / HTTP/1.1\r\n")  // status line 
    client.write("HOST: 127.0.0.1\r\n\r\n") //header 可以多 不许缺
    client.write("end\r\n")
})
client.on('data', (data) => {
    // console.log(data.toString())
    // console.log(data.toString())
    res += data.toString()
    client.end()
})
client.on("end", () => {
    // console.log(res)
    const  response = new Response()
    // const line = /[^\r\n]+\r\n/g
    response.parse(res)
    console.log('disconnected from server')
})