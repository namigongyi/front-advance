//有限状态机 00:00-01:00
//    mealy状态机  1:05(理论)
//mealy状态机：以下就是，return下一个状态的返回与输入相关
//moore状态机：知道下一个状态以后，进入下一个状态时固定的

const EOF = Symbol("EOF")

function check(str) {
    let state = start
    for (let i of str.split("").concat(EOF)) {
        // console.log(state.name,i)
        state = state(i)
    }
    if (state === success) {
        return true
    } else if (state === fail) {
        return false
    }
}
const str = '-1.1'

// console.log(check(str))
function start(char) {
    if (char === '-') {
        return afterMinus
    } else if (char === '0') {
        return afterZero
    } else if ('0'.charCodeAt() <= char.charCodeAt() && '9'.charCodeAt() >= char.charCodeAt()) {
        return afterNumber
    } else if (char === '.') {
        return afterDots
    } else {
        return fail
    }
}
function afterMinus(char) {
    if (char === EOF) {
        return fail
    } else if (char === '0') {
        return afterZero
    }
    else if ('0'.charCodeAt() <= char.charCodeAt() && '9'.charCodeAt() >= char.charCodeAt()) {
        return afterNumber
    } else if (char === '.') {
        return afterDots
    } else {
        return fail
    }
}
function afterNumber(char) {
    if (char === EOF) {
        return success
    }
    else if ('0'.charCodeAt() <= char.charCodeAt() && '9'.charCodeAt() >= char.charCodeAt()) {
        return afterNumber
    } else if (char === '.') {
        return afterDots
    } else {
        return fail
    }
}
function afterDots(char) {
    if (char === EOF) {
        return success
    }
    if ('0'.charCodeAt() <= char.charCodeAt() && '9'.charCodeAt() >= char.charCodeAt()) {
        return afterDots
    } else {
        return fail
    }
}
function afterZero(char) {
    if (char === EOF) {
        return success
    }
    else if (char === '.') {
        return afterDots
    } else {
        return fail
    }
}
function success() {
    throw new Error("invoke error")
}
function fail() {//为了让这个函数陷进去  一直return false
    return fail
}


//两个字符串相匹配  const a = 'hallowsSS' const b='halloween'

// function find(source, pattern) {
//     let sLength = source.length
//     for (let i = 0; i < sLength; i++) {
//         if (source[i] !== pattern[i]) {
//             console.log('failed')
//             return i
//         }
//     }
//     return 'success'
// }
// const a = 'hallows'.split('')
// const b = 'halloween'.split('')

// console.log(find(a, b))

// //假设patter所有字符不相同
// function find2(source, pattern) {
//     const strArr = source.split('')
//     for (let i = 0; i < strArr.length; i++) {
//         for (let j = 0; j < pattern.length; j++) {
//             if(strArr[])
//         }
//     }
// }

//source -> pattern
function find(source, parent) {
    const strArr = source.split('')
    for (let i = 0; i < strArr.length; i++) {
        if (source[i] === parent[i]) {
            return i
        }
        return -1
    }
}
//假设pattern 所有字符全不相同 ,当parttern有重复时，就要回溯 就是kmp算法
//soure:abababcfdf
//pattern:abc
function find2(source, pattern) {
    let j = 0
    for (let i = 0; i < source.length; i++) {
        if(source[i] !== pattern[j]){
            j = 0

        }
        if (source[i] === pattern[j]) {
            if (j === pattern.length - 1) {
                return i - (pattern.length -1)
            }
            j++
        } 
    }
    return -1
}

console.log(find2('wsdsdwfi', 'wfi'))


/** 
 * abcde
 *   cde
 *   ^
 * source:   abababc
 * pattern:    ababc
 *             ^ 
 * 回退到固定位置 ab
 * 
 *              
 *          00012 // 第二个b时需要回退j  j=> next(j)
 *          ababc
 * 
 *            
 */

function find3(source, pattern) {
    let j = 0
    for (let i = 0; i < source.length; i++) {
        if (source[i] === pattern[j]) {
            if (j === pattern.length - 1) {
                return i - (pattern.length -1)
            }
            j++

        } else {
            j = 0

        }
    }
    return -1
}
