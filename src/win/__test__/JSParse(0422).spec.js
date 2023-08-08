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
        {"closure":["Primary"],"$reduce":"MemberExpression"},
        {"closure":["(","Expression",")"],"$reduce":"Primary"},
        {"closure":["Literal"],"$reduce":"Primary"},
        {"closure":["Identifier"],"$reduce":"Primary"},
        {"closure":["NumberLiteral"],"$reduce":"Literal"},
        {"closure":["StringLiteral"],"$reduce":"Literal"},
        {"closure":["NullLiteral"],"$reduce":"Literal"},
        {"closure":["BooleanLiteral"],"$reduce":"Literal"}
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
        console.log(JSON.stringify(root,null,'   '))
       expect(root).toEqual([
        {
           "type": "AdditiveExpression",
           "children": [
              {
                 "type": "AdditiveExpression",
                 "children": [
                    {
                       "type": "MultiplicativeExpression",
                       "children": [
                          {
                             "type": "MemberExpression",
                             "children": [
                                {
                                   "type": "Primary",
                                   "children": [
                                      {
                                         "type": "Literal",
                                         "children": [
                                            {
                                               "val": "1",
                                               "type": "NumberLiteral"
                                            }
                                         ]
                                      }
                                   ]
                                }
                             ]
                          }
                       ]
                    }
                 ]
              },
              {
                 "val": "+",
                 "type": "+"
              },
              {
                 "type": "MultiplicativeExpression",
                 "children": [
                    {
                       "type": "MultiplicativeExpression",
                       "children": [
                          {
                             "type": "MemberExpression",
                             "children": [
                                {
                                   "type": "Primary",
                                   "children": [
                                      {
                                         "type": "Literal",
                                         "children": [
                                            {
                                               "val": "2",
                                               "type": "NumberLiteral"
                                            }
                                         ]
                                      }
                                   ]
                                }
                             ]
                          }
                       ]
                    },
                    {
                       "val": "*",
                       "type": "*"
                    },
                    {
                       "type": "MemberExpression",
                       "children": [
                          {
                             "type": "Primary",
                             "children": [
                                {
                                   "type": "Literal",
                                   "children": [
                                      {
                                         "val": "3",
                                         "type": "NumberLiteral"
                                      }
                                   ]
                                }
                             ]
                          }
                       ]
                    }
                 ]
              }
           ]
        },
        {
           "type": "EOF"
        }
     ])
    });
    it('member', () => {
        const str = 'a.b+2*3'
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
       expect(root).toEqual( [                                                                                                                       
        {
           "type": "AdditiveExpression",
           "children": [
              {
                 "type": "AdditiveExpression",
                 "children": [
                    {
                       "type": "MultiplicativeExpression",
                       "children": [
                          {
                             "type": "MemberExpression",
                             "children": [
                                {
                                   "type": "MemberExpression",
                                   "children": [
                                      {
                                         "type": "Primary",
                                         "children": [
                                            {
                                               "val": "a",
                                               "type": "Identifier"
                                            }
                                         ]
                                      }
                                   ]
                                },
                                {
                                   "val": ".",
                                   "type": "."
                                },
                                {
                                   "val": "b",
                                   "type": "Identifier"
                                }
                             ]
                          }
                       ]
                    }
                 ]
              },
              {
                 "val": "+",
                 "type": "+"
              },
              {
                 "type": "MultiplicativeExpression",
                 "children": [
                    {
                       "type": "MultiplicativeExpression",
                       "children": [
                          {
                             "type": "MemberExpression",
                             "children": [
                                {
                                   "type": "Primary",
                                   "children": [
                                      {
                                         "type": "Literal",
                                         "children": [
                                            {
                                               "val": "2",
                                               "type": "NumberLiteral"
                                            }
                                         ]
                                      }
                                   ]
                                }
                             ]
                          }
                       ]
                    },
                    {
                       "val": "*",
                       "type": "*"
                    },
                    {
                       "type": "MemberExpression",
                       "children": [
                          {
                             "type": "Primary",
                             "children": [
                                {
                                   "type": "Literal",
                                   "children": [
                                      {
                                         "val": "3",
                                         "type": "NumberLiteral"
                                      }
                                   ]
                                }
                             ]
                          }
                       ]
                    }
                 ]
              }
           ]
        },
        {
           "type": "EOF"
        }
     ])
    });
    it('equal', () => {
        const str = 'a = 20'
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
                    ["LeftHandSideExpression"],
                    ["MultiplicativeExpression",'*',"LeftHandSideExpression"],
                    ["MultiplicativeExpression",'/',"LeftHandSideExpression"],
                    ["MultiplicativeExpression",'%',"LeftHandSideExpression"],
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
            ['LeftHandSideExpression',[
                ['MemberExpression'],
            ]],
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
                        'AssignmentExpression'
                    ]
                ]
            ]
            [
                'StatementExpression',
                [
                    'Expression',
                    'IfExpression',
                    'BlockExpression',
                ]
            ],

        ];

        const initalState ={
            'AssignmentExpression':{EOF:{$finished:true}}
        }
        const ClosureMap =  new Map(rules)
        const root = parse(str,{ClosureMap,initalState})
        // console.log(JSON.stringify(root))
       expect(root).toEqual([{"type":"AssignmentExpression","children":[{"type":"LeftHandSideExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"val":"a","type":"Identifier"}]}]}]},{"val":"=","type":"="},{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"LeftHandSideExpression","children":[{"type":"MemberExpression","children":[{"type":"Primary","children":[{"type":"Literal","children":[{"val":"20","type":"NumberLiteral"}]}]}]}]}]}]}]}]},{"type":"EOF"}])
    });

   
});