const walk = require("./walk")
const acorn = require('acorn')
const fs = require('fs')
const code = fs.readFileSync('./walkTest.js', 'utf-8').toString()
const analyse = require('./analyse')
const MagicString = require('magic-string')

// const ast = acorn.parse(code, {
//     locations: true,
//     ranges: true,
//     sourceType: 'module',
//     ecmaVersion: 7
// })
// console.log(ast)
function getCode(code) {
    const ast = acorn.parse(code, {
        locations: true,
        ranges: true,
        sourceType: 'module',
        ecmaVersion: 7
    })
    const magicStr = new MagicString(code)
    return ({
        ast: ast,
        magicStr: magicStr
    })
}
let decence = 0 
let index=1
const enter = (node, parent) => {
    const { type, id } = node
    if (type === 'VariableDeclarator') {
        console.log(`${type}`)
    }else if(type === 'ArrowFunctionExpression'){
        console.log(`Fn${index}`)
        index++
    }else{

    }
}
const leave = (node, parent) => {
    const { type, id } = node
    // console.log(`${type}我leave`)
}
const {ast,magicStr}=getCode('const a=1')
analyse(ast,magicStr)
console.log(ast._scope.contain('a'))
// walk(ast, { enter, leave })