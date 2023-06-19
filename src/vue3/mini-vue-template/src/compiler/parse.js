export const parse = (template) => {
    const ast = []
    const context = {
        source: template,
        advance(length) {
            this.source = this.source.slice(length);
        },
        advanceSpace() {
            this.source = this.source.trim()
        }
    }

    //  ast.push({
    //     tag:'div',
    //     type:'Element',
    //     props:[],
    //     children:[],
    //     isUnary:false
    // })

    return parseChildren(context, [])
}
// {{foo}}</div>
function parseInterpolation(context) {
    //消费{{
    context.advance(2)
    // 找结束}}
    const endIndex = context.source.indexOf("}}")
    // 截取表达式
    const content = context.source.slice(0,endIndex)
    // 消费内容
    context.advance(content.length)
    // 消费}}
    context.advance(2)
    // 构造节点
    return {
        type:'Interpolation',
        context:{
            type:"Expression",
            content
        }
    }
}

// `<div id="xxx" >{{}}</div>`
function parseChildren(context, stack) {
    // const {source} =context
    // const pattern= /(\<)|([a-z]{1,})|(\>)|(\<\/)/g
    const nodes = []
    let r = null
    //存储解析所有的AST节点
    while (!isEnd(context, stack)) {
        //存储解析获得的ast节点
        let node
        //标签
        if (context.source[0] === '<') {
            if (context.source[1] === '/') {
                console.error("无效标签")
                continue
            }
            else if (/[a-z]/i.test(context.source[1])) {
                //开始标签
                node = parseElement(context, stack)
            }
        }
        //2.插值
        else if (context.source.startsWith("{{")) {
            node = parseInterpolation(context)
        }
        //3.文本
        if (!node) {
            node = parseText(context)
        }
        nodes.push(node)
    }

    return nodes
}
function parseText(context) {
    let endIndex = context.source.length
    //查找<
    const ltIndex = context.source.indexOf("<")
    //查找{{
    const delimiterIndex = context.source.indexOf("{{")
    if (ltIndex > -1 && ltIndex < endIndex) {
        endIndex = ltIndex
    }
    //取delimiterindex 和 endIndex 中较小的作为结束索引
    if (delimiterIndex > -1 && delimiterIndex < endIndex) {
        endIndex = delimiterIndex
    }
    //截取并消费
    const text = context.source.slice(0, endIndex)

    //构造文本
    context.advance(text.length)
    return {
        type: 'Text',
        context: text
    }
}
function isEnd(context, stack) {
    //模板解析完毕
    if (!context.source) {
        return true
    }
    const parent = stack[stack.length - 1]
    if (parent && context.source.startsWith(`</${parent.tag}`)) {
        return true
    }
    return false
    //遇到结束标签，且stack中存在同名结束标签
}
{/* <div id='xxx'>...</div> */ }
function parseElement(context, stack) {
    //1.ele 就是要解析结果ast
    const ele = parseTag(context)

    //2.入栈
    stack.push(ele)
    //3.递归处理children
    ele.children = parseChildren(context, stack)
    //4.出栈
    stack.pop()

    //5.解析结束标签
    if (context.source.startsWith(`</${ele.tag}`)) {
        parseTag(context, 'end')
    } else {
        console.error('缺少闭合标签')
    }
    return ele
}
// id="foo" v-show="isShow"></div   //我自己写的
// function parseAttrs(context,prop){
//     if(context.source[0] === '>'){
//         return prop
//     }
//     context.advanceSpace()
//     const patternName = /[^\t\r\n\f ]*(?=\=)/i
//     const name =patternName.exec(context.source)
//     context.advance(name[0]?.length)

//     const patternEqual = /=/i
//     const equal =patternEqual.exec(context.source)
//     context.advance(equal[0].length)

//     const patternValue =  /^['"]([a-z]*)['"]/i
//     const value =patternValue.exec(context.source)
//     context.advance(value[0]?.length)
//     const trimValue = value[0]?.replace(/["']/g,'')

//     prop.push({
//         type:'Attribute',
//         name:name[0],
//         value:trimValue
//     })
//      return parseAttrs(context,prop)
//     //把 >作为结尾，之前的东西截取下来。
//     //用 = 作为分隔符  ，拿出属性左右两边的东西，一边是value，一边是name
// }


//课堂写的
function parseAttrs(context) {
    let props = []
    while (!(context.source.startsWith('>' || context.source.startsWith('/>')))) {
        //吃掉空格
        context.advanceSpace()

        //吃掉name 和 = 
        const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)
        const name = match[0]
        context.advance(name.length + 1)

        //判断单引号 双引号或者没有引号
        let value = ''
        const quote = context.source[0]
        const isQuote = ['"', "'"].includes(quote)
        if (isQuote) {
            //吃掉第一个引号
            context.advance(1)
            //找到最后一个引号
            let index = context.source.indexOf(quote)

            // 截取中间value值
            value = context.source.slice(0, index)
            //吃掉value值
            context.advance(value.length + 1)
        } else {
            const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)
            value = match[0]
            context.advance(value.length + 1)
        }
        props.push({
            type: 'Attribute',
            name,
            value
        })
    }
    return props
}
function parseTag(context, type = 'start') {
    const pattern =
        type === 'start'
            ? /^<([a-z][^\t\r\n\f />]*)/i
            : /^<\/([a-z][^\t\r\n\f />]*)/i
    const match = pattern.exec(context.source)
    //['<div',group1]
    const tag = match[1]
    //消费匹配部分
    context.advance(match[0].length)
    //属性处理props
    //处理剩余字符串空格 制表符
    context.advanceSpace()
    //给属性隔开，解析属性值
    // let props = parseAttrs(context, [])  自己写的
    let props = parseAttrs(context) //课堂写的
    // console.log(props)
    //自闭和标签判断 看看是否以/>开头
    const isUnary = context.source.startsWith('/>')
    if (isUnary) {
        context.advance(2)
    } else {
        context.advance(1)
    }
    return {
        tag,
        type: 'Element',
        children: [],
        props,
        isUnary//是否自闭标签
    }
}

