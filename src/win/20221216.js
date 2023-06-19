const reg = /(gu|pa)/g
const words = 'pagugugugugupagugugupa'
let r = null
let list = []

while (r = reg.exec(words)) {
    list.push({ type: r[0] })
}
list.push({
    type: 'EOF'
})
abc(list)
console.log(JSON.stringify(list, null, '   '))
function a(words) {
    const [a, b, c] = words
    let res = a.type === 'pa' && b.type === 'gu' && c.type === 'gu'
    if(res){
        const symbol={
            type:'a'
        }
        symbol.children = words.splice(0,3,symbol)
    }
}
function b(words) {
    const [a, b, c, d] = words
    let res = a.type === 'gu' && b.type === 'gu' && c.type === 'gu' && d.type === 'pa'

    if (res) {
        const symbol = {
            type: 'b'
        }
        symbol.children = words.splice(0, 4, symbol)
        // let symbol = {
        //     children: [...words],
        //     type: 'b'
        // }
        // words.splice(0, 4, symbol)
    }
}
function c(words) {
        const symbol = {
            type: 'c'
        }
        symbol.children = words.splice(0, 1, symbol)
}
function bList(words) {

    if (words[0].type === 'gu') {
        b(words)
        bList(words)
    } else if (words[0].type === 'b') {
        if (words[1].type === 'EOF') {//只有一个b
            const symbol = {
                type: 'blist'
            }
            symbol.children = words.splice(0, 1, symbol)
        }
        else if (words[1].type === 'gu') {
            const word = words.shift()
            bList(words)
            const symbol = {
                type: 'blist'
            }
            symbol.children = [word, ...words.splice(0, 1)]
            words.unshift(symbol)
        }


    }

}
function aList(words){
    if(words[0].type === 'pa'){
        a(words)
        aList(words)
    }else if(words[0]==='a'){
        if(words[1].type ==='EOF'){
            const symbol={
                type:'alist'
            }
            symbol.children= words.splice(0,1,symbol)
        }
        else if(words[1].type === 'pa'){
            const word = words.shift()
            aList(words)
            const symbol = {
                type:'alist'
            }
            symbol.children = [word,...words.splice(0,1)]
            words.unshift(symbol)
        }
    }
}
function abc(words) {
    const [item1, item2, item3, item4,item5] = words
    if (item1.type === 'gu') {
        bList(words)
    }
    else if (item1.type === 'pa') {

        if (item2?.type === 'EOF') {//c
            c(words)
        }
        if (item2.type === 'gu' && item3.type === 'gu' && item4.type === 'pa') {//ac
            const symbol ={
                type:'abc',
                children:[]
            }
            aList(words)
            symbol.children.push(words.shift())//把处理过的拿走，塞到新的symbol.children里面
            c(words)
            symbol.children.push(words.shift())
            words.unshift(symbol)
        }
        else if(item2.type ==='gu' && item3.type==='gu' &&item4.type ==='gu' && item5.type ==='pa'){//cb
            const symbol ={
                type:'abc',
                children:[]
            }
            c(words)
            symbol.children.push(words.shift())
            bList(words)
            symbol.children.push(words.shift())
            words.unshift(symbol)
        }
        else if(item2.type ==='gu'&&item3.type ==='gu' && item4.type === 'gu' && item5.type=== 'gu'){//ab
            const symbol ={
                type:'abc',
                children:[]
            }
            aList(words)
            symbol.children.push(words.shift())
            bList(words)
            symbol.children.push(words.shift())
            console.log(symbol)
            words.unshift(symbol)
        }



    }
}