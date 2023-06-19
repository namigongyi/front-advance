// <add>::=<number>|<number>"+"<add>
//<mul>::=<number>|<number>"*"<mul>
//<minus>::=<number>"-"<minus>|<number>
//<div>::=<number>"/"<div>|<number>
// <expression>::= <number>'+'|"-"|"%"|"*"<number> 


//MutiplicativeExpression ::= <Number> | <MutiplicativeExpression> '/' <Number> | <MutiplicativeExpression> "*" <Number>
//原本是左加法
// AdditiveExpression ::=<MutiplicativeExpression> | <AdditiveExpression>"+"<MutiplicativeExpression> | <AdditiveExpression> "-"<MutiplicativeExpression>  
//我想了一下后弄成右加法
// AdditiveExpression ::=<MutiplicativeExpression> | <MutiplicativeExpression>"+"<AdditiveExpression> |  <MutiplicativeExpression> "-" <AdditiveExpression>
//LogicAndExpression ::=<AdditiveExpression>|<LoginAndExpression> "&&" <AdditiveExpression>


// 20230107
/**
 * 
// 括号
<Primary> ::= <Number> | "("<Expression>")"
 * 乘除
<Multiplicative> ::= <Primary> |<Multiplicative> "*" <Primary> | <Multiplicative> "/" <Primary>

加减
<Addtive> ::= <Multiplicative> | <Addtive> "+" <Multiplicative> | <Addtive> "-" <Multiplicative>

加减，closure(包含集)
<Addtive> ::=
<Multiplicative> |
<Addtive> "+" <Multiplicative> |
<Addtive> "-" <Multiplicative> |
<Primary>  |                            (Multiplicative展开)
<Multiplicative> "*" <Primary> |
<Multiplicative> "/" <Primary> |
<Primary> |
<Number> |                              (Primary 展开)
"(" <Expression> ")" 

<Expression> ::= <Addtive>

 */

const str = '1+2/3*9+7*44'
// 1  0  1.1  .1

const pattern = /([1-9][0-9]{0,}(?:\.[0-9]{1,}){0,}|0|^0\.[0-9]{1,}$)|([\+\-])|([\*\/])/g
let r = null
let list = []
while (r = pattern.exec(str)) {
    const [currentVal, number, additive, mutiplicative] = r
    list.push(
        {
            val: currentVal,
            type: number ? 'number' : additive ? 'addtive' : 'mutiplicative'
        }
    )

}

list.push({
    type: 'EOF'
})
//处理 number 乘除 EOF
function MutiplicativeExpression(list) {
    if (list[0].type === 'number') {//number 要包一层 Mutiple 处理完number后递归处理乘除

        const MutiplicativeSymbol = {
            type: 'MutiplicativeExpression',
            children: [...list.slice(0, 1)],
        }
        list.splice(0, 1, MutiplicativeSymbol)
        MutiplicativeExpression(list)
    }
    if (list[0].type === 'MutiplicativeExpression') {
        if (list[1].type === 'addtive' || list[1].type === 'EOF') {
            return
        } else {
            const MutiplicativeSymbol = {
                type: 'MutiplicativeExpression',
                children: [...list.slice(0, 3)],
            }
            list.splice(0, 3, MutiplicativeSymbol)

        }
    }
}
function AdditiveExpression(list) {
    if (list[0].type === 'number') {  //处理number
        MutiplicativeExpression(list)
        AdditiveExpression(list)
    } else if (list[0].type === 'MutiplicativeExpression') {//遇到 Mutiple 先包成 Additive
        const AdditiveSymbol = {
            type: "AdditiveExpression",
        }
        AdditiveSymbol.children = [...list.slice(0, 1)]
        list.splice(0, 1, AdditiveSymbol)
        AdditiveExpression(list)
    } else if (list[0].type === 'AdditiveExpression') { //处理 addivetive "+" "-"  Mutiple问题
        if (list[1].type === 'EOF') {
            return
        } else {//因为生产式为 add::= mul|add + mul 所有只要进入这层，一定是  add+ mul 只需要把add 和 + 拿起来就行了
            let children = list.splice(0, 2) //把 + - 号拿出来 （ 处理+ - )
            MutiplicativeExpression(list)//给number 包一层

            children.push(list.shift())//把 mutiple那层拿出来塞到children里
            const AdditiveSymbol = {
                type: 'AdditiveExpression',
                // children: [...list.splice(0, 2)],
            }
            AdditiveSymbol.children = children
            list.unshift(AdditiveSymbol)//把 Addti包裹的东西塞回到 list里面

            AdditiveExpression(list)
        }
    }
    return list
}


module.exports = AdditiveExpression
