const Reference = require('./Reference')
const Environment = require('./Environment')
const Completion = require('./Completion')
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
        const completion =  Evaluate(node.children[0])
        if(completion.type === 'break'){
            return completion
        }
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
        return new Completion('normal',Evaluate(node.children[0]))
    },
    IfStatement(node){
        if(node.children.length === 5){
            const condition = Evaluate(node.children[2])
            if(condition){
             return Evaluate(node.children[4])
            }else {
                return new Completion('normal')
            }
        }else{
            const condition = Evaluate(node.children[2])
            if(condition){
             return Evaluate(node.children[4])
            }else{
             return Evaluate(node.children[6])
            }
        }
      
    },
    WhileStatement(node){
        while(true){
            const condition = Evaluate(node.children[2])
            if(!condition){
                break
            }
        }
        const completion = evaluator(node.children[4])
        if(completion.type === 'break'){
            return new Completion('normal')
        }
    },
    ForStatement(node){
        if(node.children.length ===  10){
            Evaluate(node.children[2])//先声明 后循环
            while(true){
                const flag =  Evaluate(node.children[4])
                if(!flag){
                    break
                }
                
                const completion = Evaluate(node.children[9])
                if(completion.type === 'break'){
                    return new Completion('normal')
                }
                Evaluate(node.children[6])
            }
        }
    },
    Declaration(node){//给环境添加属性和赋值
        this.currentEvc.set(node.children[1].val,void 0 )
        // const temp =this.currentEvc.get()
        const ref = Evaluate(node.children[1]) //refence
        const result = Evaluate(node.children[3])
        // this.currentEvc.set(node.val,void 0)
         return ref.set(result)
    },
    BreakStatement(node){
        return new Completion('break')
    },
    BlockStatement(node){
        if(node.children.length === 3){
            //创建一个新的block scope环境 把父环境的变量全部传给block里面的环境
        this.env.push(new Environment(this.currentEvc));
        // console.log(JSON.stringify(node.children[1]),'BlockStatement')
        const res = Evaluate(node.children[1])

        this.env.pop()
        return res 
        }
        return new Completion("normal")
    },
    RelationalExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }
        let left = Evaluate(node.children[0])
        if(left instanceof Reference ){
            left = left.get()
        }
        let right = Evaluate(node.children[2])
        if(right instanceof Reference ){
            right = right.get()
        }
        // console.log(right)
        if(node.children[1].type === '>'){
            return left > right
        }
            return left < right
        
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
        //   console.log(ref)
          return ref.set(result)
        }
    },
    UpdateExpression(node){
        if(node.children.length ===1){
            return Evaluate(node.children[0])
        }
        if(node.children[1].val === '++'){//set也有return 值
            let ref=   Evaluate(node.children[0])
            let current = ref.get() + 1
            // console.log(current)
            ref.set(current)
             
        }else{
            let ref=   Evaluate(node.children[0])
            let current = ref.get() - 1
            return ref.set(current)
        }
    },
    LogicalOrExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else{
            let left = Evaluate(node.children[0])
            if(left instanceof Reference ){ 
                left = left.get()
            }
            
            if(node.children[1].type === '||'){
                if(left){
                    return  Evaluate(node.children[2])
                }
                return right
            }
        }
    },
    AdditiveExpression(node){
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else{
            let left = Evaluate(node.children[0])
            if(left instanceof Reference ){ 
                left = left.get()
            }
            let right = Evaluate(node.children[2])
            if(right instanceof Reference ){
                right = right.get()
            }
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
    MemberExpression(node){// a.b就是 reference
        if(node.children.length === 1){
            return Evaluate(node.children[0])
        }else if(node.children.length === 3){
                const object =Evaluate(node.children[0]) //a.b的话 object 存 1 
                const property =Evaluate(node.children[2])//property存的是 b
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
      return  new Reference(this.currentEvc,node.val)
    },
    BooleanLiteral(node){
        if(node.val === 'true'){
            return true
        }else if(node.val === 'false'){
            return false
        }
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