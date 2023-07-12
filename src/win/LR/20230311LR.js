//1 +2 *3 +2
//1+ (2*3) +2
//(1+(2*3)) +2
//根据 '+' : 1 -> number -> Multiplicative -> Additive (规约)
// closure 规约
//<Expression>               ::= <Additive>
//<Additive> ::=        <Multiplicative> 
//                              | <Additive> '+' <Multiplicative>
//                              | <Additive> '-' <Multiplicative>
//<Multiplicative> ::= <Primary> 
//                              | <Multiplicative> '*' <Primary>
//                              | <Multiplicative> '/' <Primary>
//<Primary>         ::= <Number> 
//                              | '(' <Expression> ')'
//以上均为左结合，**和=是右结合
//none-terminal-symbol 非终结符  Primary,Multiplicative,Additive,Expression
// terminal-symobol 终结符  number,'(' ,')'
//

/**
 * 归约：reduce  一个把当前状态进行总结的行为   右括号移入 归约
 * closure: 映射规则 ,拆分             
 * shift 移入操作：用来匹配reduce 规则  左括号移入 shift
 */
//

//根据产生式closure判断是否可以移入
//移入后对对应的rule的第二个symbol 进行求closure 判断是否可以reduce
//假如一直归约到最后还是不能移入：报错 Unexpected Token  语法错误
//假如是<Number> + <Number>
// 1.Number 先移入，再检查 "+" , 不能移入，进行reduce  Number => Primary ,
//2.再检查"+", 发现不能移入 进行reduce, Primary=> Multiplicative,
//3.再检查'+'不能移入,进行reduce  Multiplicative => Additive
//4.发现rule 里面有对应的规则，移入 '+'
//5.根据产生式判断后续可移入的为Multiplicative
//6：根据产生式判断后可续移入的为 Multiplicative 先对这个进行求 closure
//...
//最终一定要有一个EOF符号，用来判断是否可以进行归约，如果到EOF 还没有归约，那么报错：Unexpected End
const states = {
    // $reduce: "Expression",
    Number: {
        $reduce: 'Primary'
    },
    "(": {//需要预处理  防止死循环
        Expression: {
            ")": {
                $reduce: "Primary"
            }
        }
    },
    Primary: {
        $reduce: 'Multiplicative'
    },

    Multiplicative: {
        '*': {
            Multiplicative:
            {
                $reduce: 'Multiplicative'
            },
        },
        '/': {
            Multiplicative: {
                $reduce: 'Multiplicative'
            },
        },
        $reduce: 'Additive'

    },
    Additive: {
        '+': {
            Multiplicative:
            {
                $reduce: 'Additive'
            },
        },
        '-': {
            Multiplicative: {
                $reduce: 'Additive'
            },
        },
        $reduce: 'Expression'
    },
}

const ClosureArr = [
    ['Expression', [['Additive']]],
    ['Additive', [['Multiplicative'], ['Additive', '+', 'Multiplicative'], ['Additive', '-', 'Multiplicative']]],
    ['Multiplicative', [['Primary'], ['Multiplicative', '*', 'Primary'], ['Multiplicative', '/', 'Primary']]],
    ['Primary', [['Number'], ['(', 'Expression', ')']]],
]

const ClosureMap = new Map(ClosureArr)
function start(symbol) {
    if (symbol.type === 'Expression') {
        return EOF
    }
}
//一开始展开，看看到底能接受什么符号
//深度优先或者广度优先来求解
//reduce和shift 不停切换
//BFS/DFS A-star 搜索算法
//class 封装意义：一组数据与一组对该数据的操作
//推荐书：
//1.《面向对象分析与设计》 Grandy Booch
//2.《设计模式》 ：面向对象基础原则-SOLID五原则  GOF23种设计模式
//3.《the c++ programming Language》最后一个部分（面向对象）
function getClosure(symbol) {
    let rules = []
    // ClosureMap.has(symbol) && ClosureMap.get(symbol)

    const pool = [symbol] //深搜 广搜
    while (pool.length !== 0) {
        const current = pool.pop()
        console.log(current)
        if (ClosureMap.has(current)) {
            const list = ClosureMap.get(current)
            rules = [...rules, ...list.map(closure => ({ closure, $reduce: current }))]
            const [next] = list
            pool.push(...next)
        }
    }
    // while (pool.length !== 0) {
    //     const current = pool.pop() //这里决定广搜和深搜
    //     const newRules = closure(current)
    //     rules.push(...newRules)
    //     const firstSymbols = newRules.map(rule => rule[0]).filter(symbol => !dictionary.has(symbol))
    //     pool.push(...firstSymbols)
    //     firstSymbols.forEach(item => dictionary.add(item))

    // }

    return rules

}
const initialState = {
    Additive: { $reduce: "Expression" }
}
//目的：initialState =>  states  
//第一步： 把 initialState 转成 closure 状态  （可见output.json)
const extendedState = new Map()
function generateState(states) {
    extendedState.set(JSON.stringify(states),states)
    for (let target of Object.keys(states)) {
        const closureMap = getClosure(target)
        console.log(closureMap,'==========')
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
            generateState(states[target])
        }
    }
    // console.log(JSON.stringify(states, null, ' '.repeat(3)))


}
function EOF(symbol) {
    if (symbol.type === 'eof') {
        return success
    }
}
function success() {
    return success
}
// generateState(initialState)  

module.exports = { getClosure,generateState,initialState}