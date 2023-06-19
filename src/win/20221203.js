
const keyWordReg = /(const|let|var|while|for|null|if|class)|( |\n|\t)|([_$a-zA-Z][_$a-zA-Z0-9]*)|(\{|\}|\(|\)|=|\.|;)|("[^"]*"|'[^']*')/g

const target =`const str3 = '1234678';
let val = null
while(val =  keyWordReg.exec(target)){
    const {0:key,index,input} = val
}
`
const JSMap={
    'keyWord':[],
    'whiteSpace':[],
    'variable':[],
    'punctuator':[],
    'string':[],
    
}
let val = null;
let currentTarget = 0
while(val =  keyWordReg.exec(target)){
    const {0:key,1:keyWord,2:whiteSpace,3:variable,4:punctuator,5:string,input} = val
    const JSKey=JSON.parse(JSON.stringify({keyWord,whiteSpace,variable,punctuator,string}))
    Object.keys(JSKey).forEach(k=>{
        console.log(k)
        k && JSMap[k].push(JSKey[k])
    })
    
    // if(currentTarget === index ){
    //     console.log('没跳',index,key)
    // }else{
    //     console.log('跳了',index,JSON.stringify(key),key.length+"长度")
    // }
    // currentTarget = index + key.length
    console.log(JSMap)
}
