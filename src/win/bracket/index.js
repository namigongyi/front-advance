const isVaild = (array) => {
    const map = new Map([['}', "{"], [')', "("], ["]", "["]])
    const stack = []

    for (let i = 0; i < array.length; i++){
        const char = array[i]
        if(map.has(char)){
            console.log(map.get(char),'efe')
            if(stack.pop() !== map.get(char)){ //吐出来的字符匹配不上
                return false
            }
        }else{ //开口就吃进去
            stack.push(char)
        }
    }
    return stack.length === 0 

}

module.exports = {isVaild}