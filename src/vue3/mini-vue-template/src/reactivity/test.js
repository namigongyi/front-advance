
// let activeEffect = () => console.log('你好啊')
// let targetMap = new WeakMap()

// track({num:0,foo:9},'num')
// // console.log(targetMap)

// let fooMap= new WeakMap()
// fooMap.set('i',89)
// fooMap.set('j',19)
// fooMap.set('k',29)

// console.log(fooMap)


// function reactive(params) {
//     const proxy = {
//         get: (obj, prop, receiver) => {
//             // console.log(`${obj[prop]},${prop}`)
//             console.log(obj, prop)
//             return Reflect.get(obj, prop)
//         },
//         set: (obj, prop, receiver) => {
//             const res = Reflect.set(obj, prop, receiver) //已经赋值，但是过程还没结束
         
//             return res

//         },
//         deleteProperty: (obj, prop, value) => {
//             // console.log(`${obj},${prop}`)
//             return Reflect.defineProperty(obj, prop)
//         }

//     }
//     return new Proxy(params, proxy)

// }
// // const number =reactive({num:0,foo:9})
// // number.num =1
// // console.log(number.num)