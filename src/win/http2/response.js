class Response {
    constructor() {
        this.response = '';
        this.header = {};
        this.body = '';
    }
    parse(res) {
        const line = /[^\r]*\r\n/g
        let str = ''
        // console.log(line.exec(res))
        while ((str = line.exec(res))) {
            const lineRes = str[0]
            if (lineRes === '\r\n') {
                break
            }
            if (lineRes && !lineRes.startsWith('HTTP')) {
                const [key, val] = lineRes.split(': ')
                this.header[key] = val.replace('\r\n', '')
            }
        }
        // console.log(this.header)
        let linestr = '' //body
        while((linestr = line.exec(res))){
            const start =line.lastIndex
            let lineStrength = parseInt(linestr[0].replace('\r\n', ''),16)
            console.log(lineStrength)
            if(!lineStrength ){
                break
            }
            console.log(res.slice(start,start+lineStrength))
            line.lastIndex += (lineStrength +1)
        }
       
    }
}
module.exports = Response
// const str = 'i am teapot';
// const reg = /[a-z]+ |[a-z]+$/ig

// console.log(reg.lastIndex)
// console.log(reg.exec(str))
// console.log(reg.lastIndex)
// console.log(reg.exec(str))
// console.log(reg.lastIndex)


