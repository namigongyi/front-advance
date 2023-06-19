/**
 * AST语法树遍历
 */
function walk(ast,{enter,leave}){
    visit(ast,null,enter,leave)
}

/**
 * 访问者
 * @param {*} node 
 * @param {*} parent 
 * @param {*} enter 
 * @param {*} leave 
 */
function visit(node,parent,enter,leave){
    
    enter && enter(node, parent)
    if (Array.isArray(node) && node.length) {
        node.forEach(element => {
            visit(element, parent, enter, leave)
        });
    } else {
        Object.keys(node).forEach(i => {
            const value = node[i]
            if (value && typeof value === 'object') {
                visit(value, i, enter, leave)
            }
        })
    }
    leave && leave(node, parent)
    
    
}




module.exports = walk