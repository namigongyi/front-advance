const {parse,getClosure} = require('../LR/20230422')

describe('JSparse', () => {
    it('Declaration', () => {
        const str = "let a = 20;"
        const rules = [
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
            ],
            ['LeftHandSideExpression',
                [
                    ['MemberExpression'],
                ]
            ],
            [
                'AssignmentExpression',
                [
                    ['AdditiveExpression'],
                    ['LeftHandSideExpression','=','AssignmentExpression']
                ]
            ],
            [
                'Expression',
               [
                    [
                    'AssignmentExpression',
                    ],
                    [
                        'Expression',',','AssignmentExpression'
                    ]
               ]
            ],
            [
                'ExpressionStatement',
              [
                [
                    'Expression',';'
                ]
              ]
            ],
            [ 'Statement',
               [ 
                    ["ExpressionStatement"],
                    ["ForStatement"],
                    ["IfStatement"],
                    ["Declaration"],
                ]
            ],
            // [
            //     'IfStatement',
            //     [
            //         'if','(','Expression',')','Statement'
            //     ],
            //     [
            //         'if','(','Expression',')','Statement','else','{',"Statement",'}'
            //     ],
            // ],
            // [
            //     'ForStatement',
            //     [
            //         'for','(','Expression',')','Statement'
            //     ]
            // ],
            [
                'Declaration',
              [
                [
                    'var','Identifier','=','Expression',';'
                ],
                [
                    'const','Identifier','=','Expression',';'
                ],
                [
                    'let','Identifier','=','Expression',';'
                ],
              ]
            ]
        ];

        const initalState ={
            'Statement':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        expect(root).toEqual([{"type":"StatementList","children":[{"type":"StatementList","children":[{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"IfStatement","children":[{"val":"if","type":"if"},{"val":"(","type":"("},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"true","type":"BooleanLiteral"}]}]}]}]}]}]}]},{"val":")","type":")"},{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"let","type":"let"},{"val":"a","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"1","type":"NumberLiteral"}]}]}]}]}]}]}]},{"val":";","type":";"}]}]}]}]}]}]},{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"const","type":"const"},{"val":"b","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"20","type":"NumberLiteral"}]}]}]}]}]}]}]},{"val":";","type":";"}]}]}]}]},{"type":"EOF"}])
        
    });
    it('IF', () => {
        const str = `
        if(true)
        let a = 1;
        const b = 20;`
        const rules = [
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
            ],
            ['LeftHandSideExpression',
                [
                    ['MemberExpression'],
                ]
            ],
            [
                'AssignmentExpression',
                [
                    ['AdditiveExpression'],
                    ['LeftHandSideExpression','=','AssignmentExpression']
                ]
            ],
            [
                'Expression',
               [
                    [
                    'AssignmentExpression',
                    ],
                    [
                        'Expression',',','AssignmentExpression'
                    ]
               ]
            ],
            [
                'ExpressionStatement',
              [
                [
                    'Expression',';'
                ]
              ]
            ],
           
            [
                'IfStatement',
                [
                    [
                        'if','(','Expression',')','Statement'
                    ],
                    [
                        'if','(','Expression',')','Statement','else',"Statement",
                    ],
                ]
            ],
            [
                'ForStatement',
               [
                [
                    'for','(','ExpressionStatement',')','Statement'
                ]
               ]
            ],
            [
                'Declaration',
              [
                [
                    'var','Identifier','=','Expression',';'
                ],
                [
                    'const','Identifier','=','Expression',';'
                ],
                [
                    'let','Identifier','=','Expression',';'
                ],
              ]
            ],
            [ 'Statement',
            [ 
                 ["ExpressionStatement"],
                 ["ForStatement"],
                 ["IfStatement"],
                 ["Declaration"],
             ]
         ],
            [
                "StatementListItem",
                [
                    [
                        "Statement"
                    ],
                    [
                        'Declaration'
                    ]
                ]
            ],
            [
                'StatementList',
               [
                [
                    'StatementListItem'
                ],
                [
                    'StatementList',
                    'StatementListItem'
                ]
               ]
            ]
        ];

        const initalState ={
            'StatementList':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        console.log(JSON.stringify(root))
        expect(root).toEqual([{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"let","type":"let"},{"val":"a","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"20","type":"NumberLiteral"}]}]}]}]}]}]}]},{"val":";","type":";"}]}]},{"type":"EOF"}])
        
    });
    it('IF Block', () => {
        const str = `
        if(true){
            let a = 1;
            const b = 20;
        }
       `
        const rules = [
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
            ],
            ['LeftHandSideExpression',
                [
                    ['MemberExpression'],
                ]
            ],
            [
                'AssignmentExpression',
                [
                    ['AdditiveExpression'],
                    ['LeftHandSideExpression','=','AssignmentExpression']
                ]
            ],
            [
                'Expression',
               [
                    [
                    'AssignmentExpression',
                    ],
                    [
                        'Expression',',','AssignmentExpression'
                    ]
               ]
            ],
            [
                'ExpressionStatement',
              [
                [
                    'Expression',';'
                ]
              ]
            ],
           
            [
                'IfStatement',
                [
                    [
                        'if','(','Expression',')','Statement'
                    ],
                    [
                        'if','(','Expression',')','Statement','else',"Statement",
                    ],
                ]
            ],
            [
                'ForStatement',
               [
                [
                    'for','(','ExpressionStatement',')','Statement'
                ]
               ]
            ],
            [
                'Declaration',
              [
                [
                    'var','Identifier','=','Expression',';'
                ],
                [
                    'const','Identifier','=','Expression',';'
                ],
                [
                    'let','Identifier','=','Expression',';'
                ],
              ]
            ],
            [
                'BlockStatement',
                [
                    [
                        "{","}"
                    ],
                    [
                        "{","StatementList","}"
                    ]
                ]
            ],
            [ 'Statement',
            [ 
                 ["ExpressionStatement"],
                 ["ForStatement"],
                 ["IfStatement"],
                 ["Declaration"],
                 ["BlockStatement"],
             ]
            ],
            [
                "StatementListItem",
                [
                    [
                        "Statement"
                    ],
                    [
                        'Declaration'
                    ]
                ]
            ],
            [
                'StatementList',
               [
                [
                    'StatementListItem'
                ],
                [
                    'StatementList',
                    'StatementListItem'
                ]
               ]
            ]
        ];

        const initalState ={
            'StatementList':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        console.log(JSON.stringify(root))
        expect(root).toEqual([{"type":"StatementList","children":[{"type":"StatementList","children":[{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"IfStatement","children":[{"val":"if","type":"if"},{"val":"(","type":"("},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"true","type":"BooleanLiteral"}]}]}]}]}]}]}]},{"val":")","type":")"},{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"let","type":"let"},{"val":"a","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"1","type":"NumberLiteral"}]}]}]}]}]}]}]},{"val":";","type":";"}]}]}]}]}]}]},{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"const","type":"const"},{"val":"b","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"20","type":"NumberLiteral"}]}]}]}]}]}]}]},{"val":";","type":";"}]}]}]}]},{"type":"EOF"}])
        
    });
    it('asi',()=>{
        const str = `let a = 1+2*3
        const b= a`
        const rules = [
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
            ],
            ['LeftHandSideExpression',
                [
                    ['MemberExpression'],
                ]
            ],
            [
                'AssignmentExpression',
                [
                    ['AdditiveExpression'],
                    ['LeftHandSideExpression','=','AssignmentExpression']
                ]
            ],
            [
                'Expression',
               [
                    [
                    'AssignmentExpression',
                    ],
                    [
                        'Expression',',','AssignmentExpression'
                    ]
               ]
            ],
            [
                'ExpressionStatement',
              [
                [
                    'Expression',';'
                ]
              ]
            ],
           
            [
                'IfStatement',
                [
                    [
                        'if','(','Expression',')','Statement'
                    ],
                    [
                        'if','(','Expression',')','Statement','else',"Statement",
                    ],
                ]
            ],
            [
                'ForStatement',
               [
                [
                    'for','(','ExpressionStatement',')','Statement'
                ]
               ]
            ],
            [
                'Declaration',
              [
                [
                    'var','Identifier','=','Expression',';'
                ],
                [
                    'const','Identifier','=','Expression',';'
                ],
                [
                    'let','Identifier','=','Expression',';'
                ],
              ]
            ],
            [
                'BlockStatement',
                [
                    [
                        "{","}"
                    ],
                    [
                        "{","StatementList","}"
                    ]
                ]
            ],
            [ 'Statement',
            [ 
                 ["ExpressionStatement"],
                 ["ForStatement"],
                 ["IfStatement"],
                 ["Declaration"],
                 ["BlockStatement"],
             ]
            ],
            [
                "StatementListItem",
                [
                    [
                        "Statement"
                    ],
                    [
                        'Declaration'
                    ]
                ]
            ],
            [
                'StatementList',
               [
                [
                    'StatementListItem'
                ],
                [
                    'StatementList',
                    'StatementListItem'
                ]
               ]
            ]
        ];

        const initalState ={
            'StatementList':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        // console.log(JSON.stringify(root))
        expect(root).toEqual([{"type":"StatementList","children":[{"type":"StatementList","children":[{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"let","type":"let"},{"val":"a","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"1","type":"NumberLiteral"}]}]}]}]}]},{"val":"+","type":"+"},{"type":"MultiplicativeExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"2","type":"NumberLiteral"}]}]}]}]},{"val":"*","type":"*"},{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"3","type":"NumberLiteral"}]}]}]}]}]}]}]},{"type":";","value":";"}]}]}]}]},{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"Declaration","children":[{"val":"const","type":"const"},{"val":"b","type":"Identifier"},{"val":"=","type":"="},{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"val":"a","type":"Identifier"}]}]}]}]}]}]},{"type":";","value":";"}]}]}]}]},{"type":"EOF"}])
    })
});