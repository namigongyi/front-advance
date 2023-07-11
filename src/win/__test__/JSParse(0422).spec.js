const parse = require('../LR/20230422')

describe('parse', () => {
    it('literal ', () => {
        const str = "123"
        const  rules =[
            // ['Primary',[["(","Expression",")"],["Literal"],["identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            // ['MemberExpresion',[['Primary']]]
        ];

        const initalState ={
            'Literal':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
       expect(root).toEqual([{"type":"Literal","children":[{"val":"123","type":"NumberLiteral"}]},{"type":"EOF"}])
    });
    it('MemberExpression ', () => {
        const str = '"fanfan"'
        const  rules =[
            ['Primary',[["(","Expression",")"],["Literal"],["identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            // ['MemberExpresion',[['Primary']]]
        ];

        const initalState ={
            'Literal':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        console.log(JSON.stringify(root))
    });
});