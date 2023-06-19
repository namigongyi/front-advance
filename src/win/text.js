// let a= ''
// let index =0
// function foo(){
//     let o='www'
//     if(index >10){
//         o='shabi'
//     }
//     while(index<10){
//     index++
//     console.log(index,a,o)
//         foo(index)
//     }
//     console.log(index,a,o)
//     index++
//     a='uio'
// }
// foo()
// console.log(index,a,'===============')
let state  = start(1)


function start(char){
    if(char ===1){
        return success()
    }else {
        return fail
    }
}
function success(){
    return false
}
function fail(){
    
}

console.log(state === success)