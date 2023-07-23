const {parse,getClosure} = require('../LR/20230422')

describe('parse', () => {
    it('literal ', () => {
        const str = "123"
        const  rules =[
            // ['Primary',[["(","Expression",")"],["Literal"],["Identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            // ['MemberExpression',[['Primary']]]
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
            ['Primary',[["(","Expression",")"],["Literal"],["Identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            ['MemberExpression',[['Primary']]]
        ];
        const ClosureMap =  new Map(rules)
        const root = getClosure('MemberExpression',{ClosureMap})
       expect(root).toEqual([
        { closure: [ 'Primary' ], '$reduce': 'MemberExpression' },
        { closure: [ '(', 'Expression', ')' ], '$reduce': 'Primary' },
        { closure: [ 'Literal' ], '$reduce': 'Primary' },
        { closure: [ 'Identifier' ], '$reduce': 'Primary' }
      ])
    })
    it('MemberExpression ', () => {
        const str = '"fanfan"'
        const  rules =[
            ['Primary',[["(","Expression",")"],["Literal"],["Identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            ['MemberExpression',[['Primary']]]
        ];

        const initalState ={
            'Literal':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
       expect(root).toEqual( [{"type":"Literal","children":[{"val":"\"fanfan\"","type":"StringLiteral"}]},{"type":"EOF"}])
    });
    it('member ', () => {
        const str = "a.b"
        const  rules =[
            ['Primary',[["(","Expression",")"],["Literal"],["Identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            ['MemberExpression',
                [
                    ['Primary'],
                    ['MemberExpression','[','Expression',']'],
                    ['MemberExpression','.','Identifier'],
                ]
            ],
        ];

        const initalState ={
            'MemberExpression':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        console.log(JSON.stringify(root))
       expect(root).toEqual([{"type":"MemberExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"val":"a","type":"Identifier"}]}]},{"val":".","type":"."},{"val":"b","type":"Identifier"}]},{"type":"EOF"}])
    });
    it('multiplicative ', () => {
        const str = '1+2*3'
        const  rules =[
            ['Primary',[["(","Expression",")"],["Literal"],["Identifier"]]],
            ['Literal',[['NumberLiteral'],["StringLiteral"],["NullLiteral"],["BooleanLiteral"]]],
            ['MemberExpression',
                [
                    ['Primary'],
                    ['MemberExpression','[','Expression',']'],
                    ['MemberExpression','.','Identifier'],
                ]
            ],
            [
                'MultiplicativeExpression',
                [
                    ["MemberExpression"],
                    ["MultiplicativeExpression",'*',"MemberExpression"],
                    ["MultiplicativeExpression",'/',"MemberExpression"],
                    ["MultiplicativeExpression",'%',"MemberExpression"],
                ]
            ],
            [
                'AdditiveExpression',
                [
                    ['MultiplicativeExpression'],
                    ['AdditiveExpression','+','MultiplicativeExpression'],
                    ['AdditiveExpression','-','MultiplicativeExpression'],
            
                ]
            ]
        ];

        const initalState ={
            'AdditiveExpression':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        console.log(root)
    //    expect(root).toEqual([{"type":"Primary","children":[{"type":"Literal","children":[{"val":"\"fanfan\"","type":"StringLiteral"}]}]},{"type":"EOF"}])
    });

   
});