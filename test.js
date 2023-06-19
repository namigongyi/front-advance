const acorn = require('acorn')
const fs = require('fs')
const MagicString = require('magic-string')
const walk = require('./src/ran/walk')
const code = fs.readFileSync("./src/math.js", 'utf-8').toString()
const ast = acorn.parse(code, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7
})
const entery = (node,parent) =>{
    console.log(`来自${parent}的${node}进来了`)
}
const leave = (node,parent)=>{
    console.log(`来自${parent}的${node}离开了`)
}
walk(ast,{entery,leave})

// console.log(ms.snip(0,19).toString())

// const declarations = {

// }

// ast.body.map(node => { //声明过的函数
//     if (node?.type === 'VariableDeclaration') {
//         declarations[node.declarations[0].id.name] = node
//     }
// }
// );
// const statement  =[]
// ast.body
// .filter(node => node.type === 'ExpressionStatement') //筛选出使用的函数 并且声明的函数
// .forEach((o) =>{
//     statement.push(declarations[o.expression.callee.name],o)
// })


// const  m = new MagicString(code)

// let str= ''
// statement.forEach((node)=>{
//     str+= m.snip(node.start,node.end).toString()+"\n"
// })
// console.log(str)