const parse = require('../LR/20230422')

describe('parse', () => {
    it('literal ', () => {
        const str = "'fanan'"
        const  rules =[
            ['primary',["(","Expression",")"],["Literal"],["identifier"]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            // ['MemberExpresion',[['Primary']]]
        ];

        const initalState ={
            'Primary':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        console.log(ClosureMap)
        const root = parse(str,{ClosureMap,initalState})

        console.log(root)
    });
});