const fs = require('fs')
const byteArray = new Uint8Array();
const dragon = '128050'.toString(2)
console.log(dragon.length)

function encodeUTF16(str){
 
    // const len = char.length
    // 与运算  取高4位 0b 0100 0100 & 0b 1111 0000 = 0100 0000 舍去后4位
    // 与运算  取低4位 0b 0100 0100 & 0b 0000 1111 = 0000 0100 舍去前4位
    // 与运算 要看与的位数是什么
    let len = str.length;
    const byteArray = []
    for(let i = 0;i<len;i++){
        const char = str[i]
        const codePoint = char.charCodeAt(0)
        const binary = char.toString(2)

        if(codePoint < 1<< 16){
        const low = codePoint & ((1 << 8) - 1)
        const height = codePoint >> 8
      
        console.log('low',low,'heigh',height)
        byteArray.push(low,height)
        }else{
            const h1 = (codePoint >> 18) | 0b11011000;
            const l1 = (codePoint >> 10) & ((1 << 8) - 1);
    
            const h2 = (codePoint  >> 8) & ((1 << 2) -1) |0b11011000;
            const l2 = codePoint  & ((1 << 8 )-1);
            byteArray.push(l1,h1,l2,h2)
        }
       
    }
    let byLen =  byteArray.length;
    const bytes = new Uint8Array(byLen);
    for(let i= 0; i<byLen;i++){
        bytes[i] = byteArray[i]
    }
    return bytes
}
const res = encodeUTF16('\uFEFF一')
console.log(res)
fs.writeFileSync('./text.txt',res)