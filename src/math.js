// const pattern = /-{0,1}[1-9]\.[0-9]{0,}|^\.[1-9]{1,}/

// const noDotter = /-{0,1}[1-9][0-9]{0,}/

// const haveDotter = /^0\.[0-9]{1,}/

// const midDotter = /-{0,1}[1-9][0-9]{0,}\.[0-9]{0,}|^0\.[0-9]{0,}/

// const beforDotter = /^\.[0-9]{0,}/

// const d =  /-{0,1}[1-9][0-9]{0,}(\.[0-9]{0,}){0,1}|^0(\.[0-9]{0,}){0,1}/
// function match(str){
//     const  all = /^((-{0,1}([1-9][0-9]{0,}|0)(\.[0-9]{1,}){0,1})|\.[0-9]{1,})$/
//     return all.test(str)
// }
// module.exports = match
// const testData =[
//     '0',
//     '99',
//     '-11',
//     '1.8',
//     '.9',
//     '2.34.2'
// ]
// testData.forEach(i=>console.log(all.test(i)))

// const a=/a[a-z]+c/g
// const randomw='abcadc'
// let i=1
// const b= randomw.replace(a,'大菠萝')
// console.log(b)

// const pattern=/\d/g
// const str='12333'
// let r
// while(r=pattern.exec(str)){
// console.log(r)
// }

// function fib(n){
//     if(n<3){
//         return n
//     }
   
//     const arr=[1,2]
//     for (let i=2;i<n;i++){
//         arr[i] = arr[i-2]+arr[i-1]
//     }
//     console.log(arr)
//     return arr[n-1]
// }
// console.log(fib(5))