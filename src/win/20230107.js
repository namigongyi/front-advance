//56分 生产式 括号 加加  逗号 分号
//1分43 根据生产式写函数（举例）
//1分56  根据生产式写函数


//从上往下
//自增
// <Increase> ::= <Number> "++" |"++" <Number>
//括号 
//<Primary> ::=<Increase>| "(" <Expression> ")" 

// +- , 单目运算符
// <Unary> ::= <Primary> | "-" <Primary> | "+" <Primary>

//乘法
//Mutiplicative ::= <Unary> | <Mutiplicative> '/' <Unary> | <Mutiplicative> "*" <Unary>

//加法
// Additive ::=<Mutiplicative> | <Additive>"+"<Mutiplicative> | <Additive> "-"<Mutiplicative>  

//逻辑运算  && 和 || , &&比||优先
//LogicAnd ::=<Additive>|<LoginAnd> "&&" <Additive>
//LogicOr ::=<LogicAnd>|<LogicOr> "||" <LogicAnd>

// =  右结合  a = b = c = 1 >>> a = (b = (c = 1))
//<Assignment> :: <LogicOr> | <LogicOr> "=" <Assignment>

//逗号,
// <ExpressionGroup> ::= <Assignment> | <ExpressionGroup>','<Assignment>

//If
// <IfStatement> ::= <ExpressionGroup> | 'if(' <ExpressionGroup> ')'<ExpressionGroup> 
//分号
//<Split> ::= <IfStatement> | <Split> ';' <IfStatement>

//放在后面的先执行，优先级越低，放越前

const list =  require('./20221231')

class Collected {
    constructor(list){
        this.original = []
        this.walk(list,null)
        console.log(this.original)
        this.result= this.original.join('')
        
    }
    walk(ast, parent) {
        this.enter(ast, parent)
    
        if (Array.isArray(ast)) {
            ast.forEach(i => {
                this.walk(i, parent) //拿对象作为根节点
            })
        } else {
            Object.keys(ast).forEach(i => {
                const value = ast[i]
                if (value && typeof value === 'object') {
                    this.walk(value, i)
                }
            })
        }
        this.leave(ast, parent)
    }
    enter(node, parent) {
        if (node && node?.val) {
            this.original.push(node.val)
        }
    }
    leave(node, parent) {

    }
}
console.log(JSON.stringify(list,null,' '.repeat(3)))

// const res = new Collected(list)
// walk(list, null, { enter, leave })
module.exports =  Collected
