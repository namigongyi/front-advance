 const parse = (template) => {
    //input <div></div>
    //outPut {
    //   tag: "div",
    //   type: "Element",
    //   // props: [],
    //   children: [],
    //   isUnary: false,
    // }

    const source = {
        source: template,
        advance(length) {
            this.source = this.source.slice(length)
        }
    }

    return parseChildren(source,[])
}


function parseChildren(context, stack) {
    let nodes = []
    let node
    if (!isEnd(context,stack)) {
        if (context.source[0] === '<') {
            if (/[a-z]/i.test(context.source[1])) {
                node = parseElement(context, stack)
            }
        }
    }
    nodes.push(node)
    return nodes
}
function parseElement(context, stack) {
    let ele = parseTag(context)


    return ele

}
function parseTag(context, type = "start") {
    const parttern =
        type === 'start' ?
            /^<([a-z][^\t\r\n\f />]*)/i
            : /^<\/([a-z][^\t\r\n\f />]*)/i
    const match = parttern.exec(context.source)
    const tag = match[1]
    console.log(context.source)
    const isUnary = context.source.startsWith('/>')

    context.advance(match[0].length)
    if(isUnary){
        context.advance(2)
    }else{
        context.advance(1)
    }
    console.log(context)
    return {
        tag,
        type: "Element",
        children: [],
        isUnary,
    }
}
function isEnd(context,stack){
    //把模板全部吃完
    if(!context.source){
        return true
    }
    //遇到闭合标签
    const parent =stack[stack.length-1]
    if(parent && context.source.startsWitch(`</${parent.tag}`)){
        return true
    }
    return false
}

console.log(parse('<div />'))