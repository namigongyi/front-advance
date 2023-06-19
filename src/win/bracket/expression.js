const {generateState} = require('../LR/20230311LR')

const str = '(1+(2*3))'
// 1  0  1.1  .1
const AdditiveExpression = require('../20221231.js')
const pattern = /([1-9][0-9]{0,}(?:\.[0-9]{1,}){0,}|0|^0\.[0-9]{1,}$)|([\+\-])|([\*\/])|([\(\)])/g
let r = null
let list = []
while (r = pattern.exec(str)) {
    const [currentVal, number, additive, bracket] = r
    list.push(
        {
            val: currentVal,
            type: bracket ? 'bracket' : number ? 'number' : additive ? 'addtive' : 'mutiplicative'
        }
    )

}

// list.push({
//     type: 'EOF'
// })

/**
 * 
    LL 移入 规约 都是从左到右
    LR 移入 规约 都是从右到左
    shift
    reduce
 */
function expressionParse(list) {
    let stack = []
    for (let i = 0; i < list.length; i++) {
        const char = list[i].val
        const item = list[i]
        if (char === ")") {
            let temp = []
            bracketExpression(stack, temp)
            const symbol = {
                type: null,
                children: temp
            }
            stack.push(symbol)
        } else {
            stack.push(item)
        }

    }
    stack.push({
        type: 'EOF'
    })
    console.log(JSON.stringify(stack, null, ' '.repeat(3)))
    return list
}
function bracketExpression(stack, temp) {
    let child;
    while ((child = stack?.pop()).val !== '(') {// 1 + [symbol]
        temp.unshift(child)
    }
}
// console.log(expressionParse(list))
// expressionParse(list)
module.exports = {expressionParse,bracketExpression}


