//只要生成render函数中return的部分
//this._c("div",null,[...])
//this._c("div",{},'xxx')
export function generate(ast) {
    // 递归
    const code = genNode(ast[0])
    return `return ${code}`

}
function genNode(ast) {
    // 判断节点类型执行不同生成逻辑
    if (ast.type === 'Element') {
        return genElement(ast)
    } else if (ast.type === 'Text') {
        return genText(ast)
    } else if (ast.type === 'Interpolation') {
        return genText(ast.content)
    }
    return
}

//this._c("div",{},"xxx")
function genElement(ast) {
    //获取标签名称
    const tagName = ast.tag
    //属性
    const props = genProps(ast)
    //递归子元素
    const children = genChildren(ast)

    return `this._c('${tagName}',${props}${children ? `,${children}` : ' '})`

}
//todo 处理普通特性
//思考：事件 指令
function genProps(ast) {
    return null
}
function genChildren(ast) {
    //获取children
    const children = ast?.children
    //看看children类型
    if (children?.length === 1) {
        // 1.如果只有一个Text类型的子元素，希望生成字符串_c('div',null,'xxx')
       if(children[0]?.type === 'Text'){
        return `'${children[0]?.content}'`
       }else if(children[0]?.type === 'Interpolation'){
        return `this.${children[0]?.content.content}`
       }
       
    } else {
        // 2.其他情况生成数组_c('div',null,[_c(...)])
        const strs = ast.children.map(i=>
                genNode(i)
            )
            return `[${strs}]`
    }
}
//   { type: "Expression", content: "foo" }
function genText(ast) {
   let  content = ''
    //1.表达式
    if (ast?.type === 'Interpolation') {
        content= `this.${ast.content}`
    } else if (ast?.type === 'Text') {
        //2.纯文本
        content = `'${ast.content}'`
    }
    return `this._v(${content})`
}

