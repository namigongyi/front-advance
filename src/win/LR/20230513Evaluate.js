const Reference = require('./Reference')
const Environment = require('./Environment')

const globalEnv = new Environment()
const evaluator = {
    env:[globalEnv], //当前的block 栈
    get currentEvc(){//当前block的变量
        return this.env[this.env.length - 1 ]
    },
    Program(node){
        return Evaluate(node.children[0])
    },
    StatementList(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }
            Evaluate(node.children[0])
        return Evaluate(node.children[1])
    },
    StatementListItem(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }
        return Evaluate(node.children[1])
    },
    Statement(node){
        return Evaluate(node.children[0])
    },
    ExpressionStatement(node){
        return Evaluate(node.children[0])
    },
    IfStatement(node){
       while(true){
        const flag = Evaluate(node.children[5])
        if(!flag)break
        Evaluate(node.children[10])
        Evaluate(node.children[7])
       }
    },
    ForStatement(node){
        if(node.children.length ===  9){
            while(true){
                const flag =  Evaluate(node.children[5])
                if(!flag){
                    break
                }
                Evaluate(node.children[3])
                Evaluate(node.children[7])
                Evaluate(node.children[10])
               
            }
        }
    },
    Declaration(node){//给环境添加属性和赋值
        this.currentEvc.set(node.children[1].val,void 0 )
        // const temp =this.currentEvc.get()
        const ref = Evaluate(node.children[1])
        if(ref instanceof Reference ){
            const result = Evaluate(node.children[3])
            // this.currentEvc.set(node.val,void 0)
           return  ref.set(result)
        }
        
    },
    BlockStatement(node){
        if(node.children.length === 3){
        this.env.push(new Environment());
        const res = Evaluate(node.children[1])
        this.env.pop()
        return res 
        }
        return
    },
    Expression(node){
        return Evaluate(node.children[0])
    },
    AssignmentExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else{
         const ref=   Evaluate(node.children[0])
          const result =  Evaluate(node.children[2])
          ref.set(result)
        }
    },
    AdditiveExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else{
            const left = Evaluate(node.children[0])
            const right = Evaluate(node.children[2])
            if(node.children[1].type === '+'){
                return left + right
            }else{
                return left - right
            }
        }

    },
    MultiplicativeExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else{
            const left = Evaluate(node.children[0])
            const right = Evaluate(node.children[2])
            if(node.children[1].type === '*'){
                return left * right
            }else if(node.children[1].type === '/'){
                return left / right
            }else{
                return left % right
            }
        }
    },
    LeftHandSideExpression(node){
        return Evaluate(node.children[0])
    },
    MemberExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else if(node.children.length === 3){
                const object =Evaluate(node.children[0])
                const property =Evaluate(node.children[2])
                return new Reference(object,property)
        }else{
            // const left = Evaluate(node.children[0])
            // const right = Evaluate(node.children[2])
            // if(node.children.length === 3){
            //     return Evaluate(node.children[0])[node.children[2]]
            // }else{
            //     return left - right
            // }
        }
    },
    Primary(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else{
            return Evaluate(node.children[1])
        }
    },
    Literal(node){
        return Evaluate(node.children[0])
    },
    Identifier(node){
        console.log(node)
      return  new Reference(this.currentEvc,node.val)
    },
    NumberLiteral(node){
         number = eval(node.val)
         return number
    }



}

const Evaluate = (ast)=>{
    // console.log(ast,'ast')
    return evaluator[ast.type](ast)
}

module.exports = {Evaluate,globalEnv}