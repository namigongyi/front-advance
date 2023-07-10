// const {parse} = require('./20230325LR2')
const regFunction = require('./20230415')

//number string boolean | null undefined | symbol bigInt

//number  整数和浮点数 
//整数  2 10 8 16进制
//浮点数

//string
// '' ""



//boolean
//true false

//bigInt
// 10进制后加N

/**
 * (Expression)
 *
 * primary
 * 
 * literal  字面量
 * 
 * identifier
 * 
 * MemberExpression
 * 
 * ++ --
 * unary
 * 
 * multiplicative
 * addtive
 * 
 * > < == === !== !=
 * || &&  
 * 
 * =
 * 
 * Expression
 */

const extendedState = new Map()
function getClosure(symbol,{ClosureMap}) {
    let rules = []

    const pool = [symbol] //深搜 广搜
    while (pool.length !== 0) {
        const current = pool.pop()
        if (ClosureMap.has(current)) {
            const list = ClosureMap.get(current)
            rules = [...rules, ...list.map(closure => ({ closure, $reduce: current }))]
            const [next] = list
            pool.push(...next)
        }
    }
    return rules

}

function generateState(states,{ClosureMap}) {
    // console.log(ClosureMap)
    extendedState.set(JSON.stringify(states),states)
    for (let target of Object.keys(states)) {
        const closureMap = getClosure(target,{ClosureMap})
        // let targetMap = {}
        closureMap.forEach(({ closure, $reduce }) => {
            let current = states   //把states 的引用地址保存在栈里，states自身是保存在堆里，这里current只是保存一个地址
            closure.forEach((symbol, index) => {
                if (!current[symbol]) {
                    current[symbol] = {} //给当前的对象地址创造出一个引用地址，这个保存在堆里
                    // $reduce

                }
                // console.log(current,'===')
                current = current[symbol] //把堆里最新引用地址的赋值给 current（栈）
            })
            current["$reduce"] = $reduce
            current["$length"] = closure.length
        })
    }

    for (let target of Object.keys(states)) {
        if (target.startsWith("$")) continue
        if (extendedState.has(JSON.stringify(states[target]))) {
            states[target] = extendedState.get(JSON.stringify(states[target]))
        } else {
            generateState(states[target],{ClosureMap})
        }
    }
    // console.log(JSON.stringify(states, null, ' '.repeat(3)))


}


function expressionPrimary(list,{ClosureMap,initalState}) {
    let state = initalState;
    // console.log(ClosureMap)
    generateState(state,{ClosureMap})
    let stateStack = [initalState]
    let stack = []
    let currentState = () => stateStack[stateStack.length - 1]
    function shift(symbol) {
        // const nextState =  stateStack[stateStack.length - 1][symbol.type]
        while (
            !currentState()[symbol.type]
            &&
            currentState().$reduce) {//如果右nextstate 那就移入shift
            reduce()
        }
        stateStack.push(currentState()[symbol.type]) // 同时移入
        stack.push(symbol)

    }
    //直接操作stack
    function reduce() {
        // currentState = stateStack[stateStack.length - 1]
        let count = currentState().$length
        const type = currentState().$reduce
        const children = []
        while (count && count !== 0) {
            children.unshift(stack.pop())
            stateStack.pop()
            count--
        }
        const reduceItem = {
            type,
            children
        }
        shift(reduceItem)
    }

    for (let i = 0; i < list.length; i++) {
        const symbol = list[i]
        shift(symbol)
    }
 
}

function parse(str,{ClosureMap,initalState}) {
    // const pattern = /([1-9][0-9]{0,}(?:\.[0-9]{1,}){0,}|0|^0\.[0-9]{1,}$)|([\+\-])|([\*\/])|([\(\)])/g
    // let r = null
    // let list = []
    // while (r = pattern.exec(str)) {
    //     const [currentVal, number, additive, Multiplicative, bracket] = r
    //     list.push(
    //         {
    //             val: currentVal,
    //             type: bracket ? bracket : number ? 'Number' : additive ? additive : Multiplicative
    //         }
    //     )

    // }
    const list = regFunction(str)
    
    // console.log(list)
    list.push({ //为了使最后一个reduce
            type: 'EOF'
        })
    expressionPrimary(list,{ClosureMap,initalState})
    return list
}

// const  rules =[
//     ['primary',["(","Expression",")"],["Literal"],["identifier"],['MemberExpression']],
//     ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
//     ['MemberExpresion',[['Primary']]]
// ]

// const initalState ={
//     'Literal':{EOF:{$finished:true}}
// }
// const ClosureMap =  new Map(rules)
// let str = "'fannn'"
// parse(str,{ClosureMap,initalState})

module.exports = parse
