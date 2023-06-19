const { parse } = require('acorn')
const analyse = require('../../teachers/ran/lib/analyse')
const MagicString = require('magic-string')
class Module {
    constructor({ code } = {}) {
        this.imports = {}
        this.exports = {}
        this.definitions = {}
        this.code = new MagicString(code)
        this.ast = parse(code, {
            locations: true,
            ranges: true,
            ecmaVersion: 7,
            sourceType: "module"
        })
        analyse(this.ast, this.code, this)

        this.analyse()
    }
    analyse() {

        this.ast.body.forEach((node) => {
            if (node.type === 'ImportDeclaration') {
                const { value: source } = node?.source
                node.specifiers.forEach((specifiers) => {
                    const name = specifiers?.imported?.name || ''
                    const { name: localName } = specifiers.local
                    this.imports[localName] = {
                        localName,
                        name,
                        source
                    }
                })
            } else if (node.type === 'ExportNamedDeclaration') {
                const { declarations } = node.declaration
                declarations.forEach(declaration => {
                    const localName = declaration?.id?.name
                    this.exports[localName] = {
                        localName,
                        node,
                        expression: node.declaration
                    }
                })
            }
            // else if(node.type === 'VariableDeclaration'){
            //     const  {declarations} = node

            //     declarations.forEach(declaration=>{
            //        const {name} = declaration.id
            //        this.definitions[name] = node
            //     })
            // }
            if (node._defines) {
                const [keyName] = Object.keys(node._defines)
                this.definitions[keyName] = node
            }
        })
    }
    expandAllStatement() {
        const allStatement = [];
        this.ast.body.forEach(node => {
            if (node.type === 'ImportDeclaration') return
            if (node.type === 'VariableDeclaration') return
            const statements = this.expandStatement(node)
            allStatement.push(...statements)
        })
        return allStatement
    }
    /**语句扩展 : 声明+调用
     * 
     * @param {*} statement 
     * @returns 
     */

    expandStatement(statement) {
        statement._included = true
        let result = []
        const { _dependsOn } = statement
        Object.keys(_dependsOn).forEach(keyName => {
            const definitions = this.define(keyName)
                result.push(...definitions)
            
        })
        result.push(statement)
        return result
    }
    /**
     * 查找变量声明
     * @param {*} name 
     */
    define(name) {
        if (false) {

        } else {
            const statement =this.definitions[name]
            if(statement){
                if(statement._included){
                    return []
                }else{
                    //应用里 找到  b=()=>a()+1  b 里面找到 a()  循环 找到 a的应用 const a=()=>1
                    console.log(statement._dependsOn)
                    return this.expandStatement(statement)
                }
            }
        }
    }
}

module.exports = Module
// const object={a:1,b:2,c:3}
// for(let key in object){
//     if(Object.hasOwnProperty.call(object,key)){
//         console.log(object,'object',key,'key')
//     }
// }

