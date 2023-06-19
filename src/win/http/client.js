//Application:Http
//Transport TCP
//internet protocol
//Mac adress
//物理
const parse =require('./http')
const net = require('net')
const client = net.createConnection(({port:8080}),()=>{
    // console.log('client is work')
    client.write("GET / HTTP/1.1\r\n")
    client.write("HOST: 127.0.0.1\r\n\r\n")
    client.write("end\r\n")
})
client.on('data',(data)=>{
    console.log(data.toString())
    parse(data.toString())
    // console.log(data.toString())
    client.end()
})
client.on("end",()=>{
    console.log('disconnected from server')
})