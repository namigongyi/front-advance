
// console.log(check(str))

///next 函数用状态机表示  abcde状态机

function success() {
    return success
}
function generateNext(pattern) {
    const next = [0]
    let j = 1
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === pattern[j]) {
            j++
        } else {
            j = 0
        }
        next[i + 1] = j
    }
    return next

}

function generateFactory(states, pattern) {
    const nextArr = generateNext(pattern)
    for (let i = 1; i < pattern.length; i++) {
        states.push(stateFunc(pattern[i], i+1 , nextArr[i]))
    }
    function stateFunc(nextChar, nextStateIndex, redirectIndex) {
        return (char) => {
            console.log(nextChar,char)
            if (char === nextChar) {
                console.log(nextStateIndex,'nextstateIndex')
                return states[nextStateIndex]
            }
            return states[redirectIndex](char)
        }
    }


}
function kmpCheck(source, pattern) {

    function start(char) {
        if (char === pattern[0]) {
            return states[1]
        }
        return start
    }
    
    let state =start
    const states = [start]
    generateFactory(states, pattern)
    states.push(success)

    for (let i of source.split('')) {
        state = state(i)
    }
    console.log(state)
    if (state === success) {
        return true
    }
    return false
}
// kmpCheck(null, 'abababc')
// const chartD  = stateFunc('e',success,start)

// const chartC  = stateFunc('d',chartD,start)

// const chartB  = stateFunc('c',chartC,start)

// const chartA  = stateFunc('b',chartB,start)
// function afterB(char) {
//     if (char === 'a') {
//         return afterA2
//     } else {
//         return start(char)

//     }
// }
// function afterA2(char) {
//     if (char === 'b') {
//         return afterB2
//     } else {
//         return start(char)

//     }
// }
// function afterB2(char) {
//     if (char === 'c') {
//         return success
//     } else {
//         return afterB(char)
//     }
// }
module.exports = { kmpCheck }