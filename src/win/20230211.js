//假设pattern 所有字符全不相同 ,当parttern有重复时，就要回溯 就是kmp算法
//soure:abababcfdf
//pattern:abc
function find2(source, pattern) {
    let j = 0
    for (let i = 0; i < source.length; i++) {
        if (source[i] !== pattern[j]) {
            j = 0

        }
        if (source[i] === pattern[j]) {
            if (j === pattern.length - 1) {
                return i - (pattern.length - 1)
            }
            j++
        }
    }
    return -1
}
//ababc
//  ababc
//00120^
//手写next算法
function generateNext(pattern) {
    const next = [0] //写死
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
console.log(generateNext('ababc'))

//kmp算法  53:00  解析next 函数生成
//回退最长公共匹配串去匹配
function kmp(source, pattern) {
    let j = 0
    const next = [0, 0, 0, 1, 2]
    const next1 = generateNext(pattern)
    console.log(next1)
    for (let i = 0; i < source.length; i++) {
        if (source[i] !== pattern[j]) {
            console.log(next1[j])
            j = next1[j]

        }
        if (source[i] === pattern[j]) {
            if (j === pattern.length - 1) {
                return i - (pattern.length - 1)
            }
            j++
        }
    }
    return -1
}



const EOF = Symbol('EOF')

function check(str) {
    let state = start
    for (let i of str.split("").concat(EOF)) {
        // console.log(state.name,i)
        state = state(i)
    }
    console.log(state === success)
    if (state === success) {
        return true
    } else if (state === fail) {
        return false
    }
}

const str = 'abcde'

// console.log(check(str))

///next 函数用状态机表示  abcde状态机
function start(char) {
    if (char === char) {
        return chartA
    } else {
        return start(char)
    }
}
// function afterA(char) {
//     if (char === 'b') {
//         return afterB
//     } else {
//         return start(char)
//     }
// }
const states= [start]
const pattern='abcde' 
for(let i = 0;i<pattern.length;i++){
    states.push(stateFunc(pattern[i],i+1,0))
}
function stateFunc(nextChar,nextStateIndex,redirectIndex){
    return (char)=>{
        if (char === nextChar) {
            return states[nextStateIndex]
        } else {
            return states[redirectIndex](char)
        }
    }
}
console.log(JSON.stringify(states))
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
function success() {
    return success
}
function fail() {
    return fail
}


module.exports = { find2, kmp, check }

