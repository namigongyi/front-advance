const str ={
    source:` id="foo" v-show="isShow"></div>`,
    advance(length){
        this.source = this.source.slice(length)
    },
    trim(){
        this.source = this.source.trim()
    }
}
//  props: [
    // {
    //     type: "Attribute",
    //     name: "id",
    //     value: "foo",
    //   },
    //   {
    //     type: "Attribute",
    //     name: "v-show",
    //     value: "isShow",
    //   },
    // ],

function parseAttrs(context,stack){
    if(context.source[0] === '>'){
        return stack
    }
    context.trim()
    const patternName = /[^\t\r\n\f ]*(?=\=)/i
    const name =patternName.exec(context.source)
    context.advance(name[0]?.length)

    const patternEqual = /=/i
    const equal =patternEqual.exec(context.source)
    context.advance(equal[0].length)

    const patternValue =  /^['"]([a-z]*)['"]/i
    const value =patternValue.exec(context.source)
    context.advance(value[0]?.length)
    const trimValue = value[0]?.replace(/["']/g,'')

    stack.push({
        type:'Attribute',
        name:name[0],
        value:trimValue
    })
    return parseAttrs(context,stack)
    //把 >作为结尾，之前的东西截取下来。
    //用 = 作为分隔符  ，拿出属性左右两边的东西，一边是value，一边是name
}
let props= parseAttrs(str,[])
console.log(props)