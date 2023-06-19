 function generateBody(str) {
    let lenght = 0
    let lengthStr = ''
    let body = ''
    let state = readLength;
    for (let char of str) {
        this.state = state(char)
        if (body.length > 0) {
            yield body
            body = ''
        }
    }
    function readLength(char) {
        if (typeof char === '\r') {
            return beforLineBreak
        }
        lenghtStr += char;
        return readLength;
    }

    function beforLineBreak(char) {
        lenght = Number.parseInt(lengthStr, 16)
        if (char === '\n') {
            return readChunkState
        }
    }

    function readChunkState(char) {
        lenght--
        if (lenght >= 0) {
            return readChunkState
        } else {
            return readLength
        }
    }
}

const str = `
15\r
<h1>Hello World!</h1>\r
0\r\n`
const body = generateBody(str)
for (let char of body) {
    console.log(char)
}