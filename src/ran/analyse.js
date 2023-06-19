const walk = require('./walk')
const Scope = require('./scope')
/**
 * 
 * @param {*} ast 
 * @param {*} magicStr 
 */
function analyse(ast, magicStr) {
    ast._scope = new Scope()
    let currentScope = ast._scope

    ast.body.forEach(element => {
        const enter = (node, parent) => {
            switch (node.type) {
                // case 'ArrowFunctionExpression':
                //     currentScope = new Scope({parent:currentScope})
                //     ast._scope = currentScope
                //     // console.log(node)
                //     break
                case 'VariableDeclarator':
                    currentScope.add(node.id.name)
                    if(!element._defines){
                        element._defines = { [node.id.name]: true }
                    }
                    
                    break
                case "FunctionDeclaration":

                    currentScope.add(node.id.name)
                    element._defines = { [node.id.name]: true }
                    currentScope = new Scope({parent:currentScope})
                    ast.Scope = currentScope
                    element._scope =currentScope
                    // console.log(element)
                break
                default:
                    break
            }
        }
        const leave = (node, parent) => {
            // if (node.type === 'ArrowFunctionExpression') {
            //     currentScope = currentScope.parent
            // }
        }
        walk(element, { enter, leave })
    })
}

module.exports = analyse