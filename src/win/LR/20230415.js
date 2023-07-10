/**
 *
 *  const rule = [
        ['Literal',
            [["Number"], ['Null'], ["Boolean"], ["String"]]
        ],
        [
            'Primary',
            [["(","Expression",")"],["Literal"],["Identifier"]]
        ],
        [
            "MemberExpression",[
                ["Primary"],
                ["MemberExpression","[","Expression","]"],
                ["MemberExpression",".","Identifier"],
                ["New","MemberExpression","(",")"],
                ["MemberExpression","(",")"],
            ]
        ]
    ]
 */


// const  numberReg = /(?<number>(-{0,1}([1-9][0-9]{0,}|0)(\.[0-9]{1,}){0,1})|\.[0-9]{1,}))/
// const  nullReg = /(?<null>null)/
// const  kewordReg = /(?<keyword>const|let|var|new)/
// const  operatorReg = /(?<operator>\(|\)|\[|\]|\.|\=)/
// const  identifierReg = /(?<identifier>[_$A-Za-z][_$A-Za-z0-9]{0,})/
// const  stringReg = /(?<string>[']([^'\r\n]*|\\.)[']$ | ^["]([^"\r\n]*|\\.)["])/
// const  boolReg = /(?<boolean>[true|false])/

const regStr = `
(?<keyword>(?:const|let|var|new)(?![a-zA-Z0-9_$]))
(?<NumberLiteral>(-{0,1}(([1-9][0-9]{0,}|0)(\\.[0-9]{1,}){0,1})|\\.[0-9]{1,}))
(?<NullLiteral>null)
(?<operator>\\(|\\)|\\[|\\]|\\.|\\=)
(?<identifier>[_$A-Za-z][_$A-Za-z0-9]{0,})
(?<StringLiteral>/"(?:[^"\\n\\\\\\r\\u2028\\u2029]|\\\\(?:['"\\\\bfnrtv\\n\\r\\u2028\\u2029]|\\r\\n)|\\\\x[0-9a-fA-F]{2}|\\\\u[0-9a-fA-F]{4}|\\\\[^0-9ux'"\\\\bfnrtv\\n\\\\\\r\\u2028\\u2029])*"|'(?:[^'\\n\\\\\\r\\u2028\\u2029]|\\\\(?:['"\\\\bfnrtv\\n\\r\\u2028\\u2029]|\\r\\n)|\\\\x[0-9a-fA-F]{2}|\\\\u[0-9a-fA-F]{4}|\\\\[^0-9ux'"\\\\bfnrtv\\n\\\\\\r\\u2028\\u2029])*'/, RegularExpressionLiteral:/\\/(?:\\[(?:\\\\[\\s\\S]|[^\\]])*\\]|[^*\\/\\\\\\n\\r\\u2028\\u2029]|\\\\[^\\n\\r\\u2028\\u2029])(?:\\[(?:\\\\[\\s\\S]|[^\\]])*\\]|[^\\/\\\\\\n\\r\\u2028\\u2029]|\\\\[^\\n\\r\\u2028\\u2029])*\\/[0-9a-zA-Z]*/};)
(?<BooleanLiteral>[true|false])
`
// const itemReg = new RegExp(regStr)
const reg = new RegExp(regStr.trim().replaceAll(' ','').replaceAll('\n','|'),'g')

// const str =  "let a = 123 "

function regFunction(str){
    let r;
    const list = []
    let json = {}
    
    // console.log(reg)
    while (r = reg.exec(str)){
        console.log(r.groups)
        const item= Object.entries(r.groups)
                        .filter(([key,val])=>val)
                        .map(([key,val])=>({val,type:key}))
        list.push(item)

    }
    return list
}
module.exports = regFunction

