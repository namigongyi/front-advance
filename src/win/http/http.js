const stream = require('stream')
const { chukBodyParse } = require('./chunkBodyParse')
const response = {
    statusCode: '',
    statusText: '',
    headers: {
        // "Content-type": '',
    },
}

module.exports = function parse(str) {
    let state = start
    const EOF = Symbol("EOF")
    const res = str.split(' ')
    for (let i of str.split('')) {
        // console.log(state.name)
        state = state(i)
    }
    console.log(response)
}

let currentHeaderKey = ''
let currentHeaderValue = '';
//reconsume
//状态函数 不是 纯函数  可以有副作用（只能是写），不能是闭包
function start(char) {
    if (char === ' ') return afterHttp
    return start
}
function afterHttp(char) {
    if (char === ' ') {
        return afterCode
    }
    response.statusCode += char
    return afterHttp
}
function afterCode(char) {
    if (char === '\r') {
        return headerStatus
    }
    response.statusText += char
    return afterCode
}
// function afterStatus(char) {
//     if (char === ' ') {
//         return afterFirstLine
//     }
//     return afterStatus
// }
function error(char) {
    console.log('error', char)
    return error
}

function headerStatus(char) {
    if (char === '\n') {
        return enterKey
    }
    return error
}
function enterKey(char) {
    if (char === '\r') {
        return headerEndLineBreak
    } if (char === ':') {
        return afterKey
    }
    currentHeaderKey += char
    return enterKey
}
// function enterKey(char) {
//     if (char === ':') {
//         return afterKey
//     }
//     return enterKey
// }
function afterKey(char) {
    if (char !== ' ') return enterValue(char)  //不传进去的话，就会吞掉一个字符
    return afterKey
}

function enterValue(char) {
    if (char === '\r') {
        response['headers'][currentHeaderKey] = currentHeaderValue
        currentHeaderKey = ''
        currentHeaderValue = ''
        return headerStatus
    }
    currentHeaderValue += char
    return enterValue
}
function headerEndLineBreak(char) {
    if (currentHeaderValue !== '') {
        return error
    }
    return afterUNKNOW
}
// function afterContentType(char) {
//     if (char === '\r') {
//         return afterHeader
//     }
//     response.headers["Content-type"] += char
//     return afterContentType
// }

// function afterHeader(char) {//date
//     if (char === '\r') {
//         return afterDate
//     }
//     return afterHeader
// }

// function afterDate(char) {//connetion
//     if (char === '\r') {
//         return afterConnection
//     }
//     return afterDate
// }
// function afterConnection(char) {//keepalive
//     if (char === '\r') {
//         return afterKeepAlive
//     }
//     return afterConnection
// }
// function afterKeepAlive(char) {//transfer
//     if (char === '\r') {
//         return afterTransfer
//     }
//     return afterKeepAlive
// }
// function afterTransfer(char) {
//     if (char === '\r') {
//         return afterUNKNOW
//     }


//     return afterTransfer
// }
function afterUNKNOW(char) {
    if (char === '\r') {
        return afterUNKNOW1
    }
    return afterUNKNOW
}
function afterUNKNOW1(char) {
    if (char === '\n') {
        response.body = new stream.Writable()
        return body

    }
    return afterUNKNOW1
}
function body(char) {
    if (char === '\r') {
        return afterBody
    }
    response.body.write(char)
    return body
}
function afterBody(char) {
    return afterBody
}