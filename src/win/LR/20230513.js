const  { parse } = require("./20230422.js");

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
        'FuntionDeclaration',
        [
            ['function','Identifier','(','Parameters',')','{','StatementList','}'],
            ['function','Identifier','(',')','{','StatementList','}']
        ]
    ],
    [   'Parameters',
        [   ['Identifier'],
            ['Parameters',',','Identifier']
        ]
    ],
    [
        'MultiplicativeExpression',
        [
            ["UpdateExpression"],
            ["MultiplicativeExpression",'*',"UpdateExpression"],
            ["MultiplicativeExpression",'/',"UpdateExpression"],
            ["MultiplicativeExpression",'%',"UpdateExpression"],
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
            // ['CallExpression'], 
            // ['NewExpression'], //这里分成两个分支，new 后面不带括号就是 newexpression ,带括号就是callexpression
        ]
    ],
    [   'CallExpression'
        ,
        [
            ['CallExpression','.','Identifier'],
            ['new','MemberExpression','(',')'],
            ['MemberExpression','(',')'],
            ['CallExpression','[','Expression',']'],
            ['CallExpression','(','Arguments',')'],
        ]
    ],
    [
        'NewExpression',
        [
            ['MemberExpression'],
            ['new','NewExpression'],
        ]

    ],
  
    [
        'AssignmentExpression',
        [
            ['RelationalExpression'],
            ['LeftHandSideExpression','=','AssignmentExpression']
        ]
    ],
    [
        'LogicalOrExpression',
        [
            [
                'AdditiveExpression'
            ],
            [
                'LogicalOrExpression','||','AdditiveExpression'
            ]
        ]
    ],
    [
        'RelationalExpression',
        [
            [
                'LogicalOrExpression'
            ],
            [
                'RelationalExpression','>','LogicalOrExpression'
            ],
            [
                'RelationalExpression','<','LogicalOrExpression'
            ],
        ]
    ],
    [
        "UpdateExpression",
        [
            ['LeftHandSideExpression'],
            ['LeftHandSideExpression',"++"],
            ['LeftHandSideExpression',"--"],
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
        'WhileStatement',
        [
            [
                'while','(','Expression',')','Statement'
            ]
        ]
    ],
    [
        'ForStatement',
       [
        [
            'for','(','Expression',';','Expression',';','Expression',';',')','Statement'
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
    [
        'BreakStatement',
        [
            [
                'break',';'
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
         ["WhileStatement"],
         ["BreakStatement"],
         ["FuntionDeclaration"],
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
    ],
    [
        'Program',
        [
            [
                'StatementList'
            ]
        ]
    ]
];

const initalState ={
    'Program':{EOF:{$finished:true}}
}

const ClosureMap =  new Map(rules)



const Parse = (str)=>{
    return parse(str,{ClosureMap,initalState})
}

module.exports = {Parse}