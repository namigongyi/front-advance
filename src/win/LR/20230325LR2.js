const { generateState } = require('./20230311LR')
const { expressionParse, bracketExpression } = require("../bracket/expression")
const initialState = {
    Expression:{
        $finish:true,
        $count:1
    },  
    Additive: { $reduce: "Expression" }
}
const str = '(1+2)*3'
// const str = '(1+(2*3))'
// 1  0  1.1  .1



function parse(str) {
    const pattern = /([1-9][0-9]{0,}(?:\.[0-9]{1,}){0,}|0|^0\.[0-9]{1,}$)|([\+\-])|([\*\/])|([\(\)])/g
    let r = null
    let list = []
    while (r = pattern.exec(str)) {
        const [currentVal, number, additive, Multiplicative, bracket] = r
        list.push(
            {
                val: currentVal,
                type: bracket ? bracket : number ? 'Number' : additive ? additive : Multiplicative
            }
        )

    }
    list.push({ //为了使最后一个reduce
            type: 'EOF'
        })
    expressionPrimary(list)

}
function expressionPrimary(list) {
    // let temp = state;
    generateState(initialState)
    // let state = initialState
    let stateStack = [initialState]
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

    //解释： 例如 1 * 2
    //1.当 `1`移进来,type 是number 先查看当前 statestack 对应有没有,查到归约对象是primary，塞进stack,statestack也进入 Numer
    //2.移入 `*`   Number 下并没有 type '*' ,  于是 *对当前 Primary 没找到 `*` ,会进入 reduce 状态
    //3. 进入 reduce后，把statestack的顶层和stack的顶层移除，把number reduce 成primay  传给 shift（第二个shift）
    //4.这时的symbol是  primary 而不是 `*` ,primary 对应归约对象是node Multiple,Multiple 塞stack, statestack 也进入 Multiple
    //5.因为第一层shift 的!currentState()[symbol.type]  一直监听 当前statestack的状态，所有进入Multiple后查到有 `*`号
    //6.`*` 塞进 stack , statesstack 进入 `*`
    //7.继续外层遍历，2也进来shift
    for (let i = 0; i < list.length; i++) {
        const symbol = list[i]
        shift(symbol)
    }
    // stack.push({
    //     type: 'EOF'
    // })
    console.log(JSON.stringify(stack, null, ' '.repeat(3)))
    // return list
}
// parse('(1+2)*3')

module.exports = { parse }