

const Collected = require("./20230107")
class Reduce {
    constructor(type) {
        this.type = type
        return this.children
    }
    shiftChildren(start, length, list) {
        const _item = {
            type: this.type,
            children: [...list.slice(start, length)]
        }
        list.splice(start, length, _item)
    }
    pushChildren(list, children) {
        children.push(list.shift())
        const _item = {
            type: this.type,
            children
        }
        list.unshift(_item)
    }
    addThree(children) {
        if (!this.children) this.children = []
        this.children.push(...children)
    }


}

// <Bracket> ::=
// <Number> |
// "(" <Expression> ")" 
function Bracket(list) {
    const [first, second] = list
    if (['number'].includes(first.type)) { //最底层，包一下number 和 '('开头
        const bracket = new Reduce('bracket')
        bracket.shiftChildren(0, 1, list)
    } else if ('bracketOpen' === first.type) { //bracket直接包成 multiplicative
        let leftChildren = list.splice(0, 1)
        Expression(list)
        let expression  = list.splice(0,1)
        // children.push(list.shift())//把 mutiple那层拿出来塞到children里
        let rightChildren = list.splice(0, 1)
        const symbol = {
            type: 'bracket',
        }
        symbol.children = [leftChildren,expression,rightChildren]

        list.unshift(symbol)//把 Addti包裹的东西塞回到 list里面
        
    }
}
// <Multiplicative> ::=
// <Number> |
// "(" <Expression> ")" 
//<Bracket>                      | //mul
//<Multiplicative> "+" <Bracket> | //mul
//<Multiplicative> "-" <Bracket> | //mul
function Multiplcative(list) {
    const [first, second] = list
    if (['number', 'bracketOpen'].includes(first.type)) { //最底层，包一下number 和 '('开头
        Bracket(list)
        Multiplcative(list)
    } else if ('bracket' === first.type) { //bracket直接包成 multiplicative
        const additive = new Reduce('multiplicative')
        additive.shiftChildren(0, 1, list)
        Multiplcative(list)
    } else if ('multiplicative' === first.type) {
        //multiplicative => additive  有可能它是number -> multiplicative -> additive （+ -）
        //也有可能它是number -> multiplicative   （* /）
        if (mulArry.includes(second.type)) {
            let children = list.splice(0, 2)
            Bracket(list)
            children.push(list.shift())//把 mutiple那层拿出来塞到children里
            const symbol = {
                type: 'multiplicative',
                // children: [...list.splice(0, 2)],
            }
            symbol.children = children
            list.unshift(symbol)//把 Addti包裹的东西塞回到 list里面
            Multiplcative(list)
        }
    }
}
//<Additive> ::=
// <Number> |   //bracket
// "(" <Expression> ")"   //bracket
//<Bracket> |                      //mul
//<Multiplicative> "*" <Bracket> | //mul
//<Multiplicative> "/" <Bracket> | //mul
//<Multiplicative> |               //add
//<Additive> "+" <Multiplicative> | //add
//<Additive> "-" <Multiplicative> | //add
function Additive(list) {
    const [first, second] = list
    if (['number', 'bracketOpen'].includes(first.type)) { //最底层，包一下number 和 '('开头
        Bracket(list)
        Additive(list)
    } else if ('bracket' === first.type) { //bracket直接包成 multiplicative
        Multiplcative(list)
        Additive(list)
    } else if ('multiplicative' === first.type) {
        //multiplicative => additive  有可能它是number -> multiplicative -> additive （+ -）
        //也有可能它是number -> multiplicative   （* /）
        if (mulArry.includes(second.type)) {
            Multiplcative(list)
        } else {   //<Multiplicative> |  //add
            const additive = new Reduce('additive')
            additive.shiftChildren(0, 1, list)
        }
        Additive(list)
    } else if ('additive' === first.type) { //最高级了  可以直接return出去，如果后面还要接的话在这层 
        if (addArry.includes(second.type)) {
            let children = list.splice(0, 2)
            Multiplcative(list)
            children.push(list.shift())//把 mutiple那层拿出来塞到children里
            const symbol = {
                type: 'additive',
                // children: [...list.splice(0, 2)],
            }
            symbol.children = children
            list.unshift(symbol)//把 Addti包裹的东西塞回到 list里面
            Additive(list)
        }
    }
    // if (['number', 'bracketOpen'].includes(first.type)) { //最底层，包一下number 和 '('开头
    //     Bracket(list)
    //     Additive(list)
    // }else if (first.type === 'MutiplicativeExpression') {//遇到 Mutiple 先包成 Additive
    //     const AdditiveSymbol = {
    //         type: "AdditiveExpression",
    //     }
    //     AdditiveSymbol.children = [...list.slice(0, 1)]
    //     list.splice(0, 1, AdditiveSymbol)
    //     Additive(list)
    // } else if (first.type === 'AdditiveExpression') { //处理 addivetive "+" "-"  Mutiple问题
    //     if (second.type === 'EOF') {
    //         return
    //     } else {//因为生产式为 add::= mul|add + mul 所有只要进入这层，一定是  add+ mul 只需要把add 和 + 拿起来就行了
    //         let children = list.splice(0, 2) //把 + - 号拿出来 （ 处理+ - )
    //         Multiplcative(list)//给number 包一层

    //         children.push(list.shift())//把 mutiple那层拿出来塞到children里
    //         const AdditiveSymbol = {
    //             type: 'AdditiveExpression',
    //             // children: [...list.splice(0, 2)],
    //         }
    //         AdditiveSymbol.children = children
    //         list.unshift(AdditiveSymbol)//把 Addti包裹的东西塞回到 list里面

    //         Additive(list)
    //     }
    // }
    // return list
}

/*
<Expressive> ::= 
<Additive><???> |                 //expression
<Multiplicative> |               //add
<Additive> "+" <Multiplicative> | //add
<Additive> "-" <Multiplicative> | //add
<Bracket> |                      //mul
<Multiplicative> "*" <Bracket> | //mul
<Multiplicative> "/" <Bracket> | //mul
<Number>  |                      //bracket
"("<Expression> ")"
*/
const addArry = ['+', '-']
const mulArry = ['*', '/']
//入口函数
function Expression(list) {
    const [first, second] = list
    if (['number', 'bracketOpen'].includes(first.type)) { //最底层，包一下number 和 '('开头
        Bracket(list)
        Expression(list)
    } else if ('bracket' === first.type) { //bracket直接包成 multiplicative
        Multiplcative(list)
        Expression(list)
    } else if ('multiplicative' === first.type) {
        //multiplicative => additive  有可能它是number -> multiplicative -> additive （+ -）
        //也有可能它是number -> multiplicative   （* /）
        if (mulArry.includes(second.type)) {
            Multiplcative(list)
        } else {
            Additive(list)
        }
        Expression(list)
    } else if ('additive' === first.type) { //最高级了  可以直接return出去，如果后面还要接的话在这层 
        if (addArry.includes(second.type)) {
            Additive(list)
            Expression(list)
        }
        // if (second.type === 'EOF') { return }

    }
}

// const str = '1*2/5+3'
// 编译语言
// reduce  归约
//shift 移入
// LL：从左到右移入（shift）,从左到右规约

function Calculate(str) {
    const pattern = /([1-9][0-9]{0,}(?:\.[0-9]{1,}){0,}|0|^0\.[0-9]{1,}$)|([\+\-])|([\*\/])|([\(\)])/g
    let r = null
    let list = []
    while (r = pattern.exec(str)) {
        let [currentVal, number, additive, mutiplicative, bracket] = r
        if (bracket === '(') {
            bracket = 'bracketOpen'
        } else if (bracket === ')') {
            bracket = 'bracketClose'
        }
        list.push(
            {
                val: currentVal,
                type: number ? 'number' : bracket ? bracket : currentVal
            }
        )
    }
    list.push({ type: 'EOF' })
    // console.log(list)
    Expression(list)
    console.log(JSON.stringify(list,null,' '.repeat('3')))
    const { result } = new Collected(list)

    return result
}
module.exports = Calculate