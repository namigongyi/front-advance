const {parse,getClosure} = require('../LR/20230422')

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
    it("test getClosure",()=>{
        const  rules =[
            ['Primary',[["(","Expression",")"],["Literal"],["identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            // ['MemberExpresion',[['Primary']]]
        ];
        const ClosureMap =  new Map(rules)
        const root = getClosure('Primary',{ClosureMap})
       expect(root).toEqual( [
        { closure: [ '(', 'Expression', ')' ], '$reduce': 'Primary' },
        { closure: [ 'Literal' ], '$reduce': 'Primary' },
        { closure: [ 'identifier' ], '$reduce': 'Primary' },
        { closure: [ 'NumberLiteral' ], '$reduce': 'Literal' },
        { closure: [ 'StringLiteral' ], '$reduce': 'Literal' },
        { closure: [ 'NullLiteral' ], '$reduce': 'Literal' },
        { closure: [ 'BooleanLiteral' ], '$reduce': 'Literal' }
      ])
    })
    it('MemberExpression ', () => {
        const str = '"fanfan"'
        const  rules =[
            ['Primary',[["(","Expression",")"],["Literal"],["identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            // ['MemberExpresion',[['Primary']]]
        ];

        const initalState ={
            'Primary':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
       expect(root).toEqual([{"type":"Primary","children":[{"type":"Literal","children":[{"val":"\"fanfan\"","type":"StringLiteral"}]}]},{"type":"EOF"}])
    });

   
});