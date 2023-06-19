const Bundle =require('../src/ran/bundle')
const fs = require('fs')
jest.mock("fs")
describe('Test bundle',()=>{
    // test('test fetchModule',()=>{
    //     const bundle = new Bundle({entry:'./a.js'});
    //     //制造fs.readFileSync返回值
    //     fs.readFileSync.mockReturnValueOnce("const a = 1")
    //     const moudle = bundle.fetchModule('index.js')
    //     const calls = fs.readFileSync.mock.calls;
    //     // const file = fs.readFileSync('./a.js');
    //     // fs.readFileSync()
    //     // expect(calls[0][0]).toEqual('./a.js')
    //     // expect(file).toEqual("const a = 1")
    //     //MagicString 对象
        
    //     expect(moudle.code.toString()).toEqual(`const a = 1`)
    //     expect(calls[0][0]).toEqual("index.js")
    // })
    // test("test fetchModule2",()=>{
    //     const bundle =new Bundle({enter:'./a.js'})
    //     fs.readFileSync.mockReturnValueOnce('const a =1')
    //     //a.js 引用了 b.js代码
    //     const moudle =bundle.fetchModule('./b.js','/c/a.js')
    //     expect(calls[0][0]).toEqual('const a =1')
    // })

    // test("test build",()=>{
    //     const bundle =new Bundle({entery:'./a.js'})
    //     fs.readFileSync.mockReturnValueOnce('console.log(1)')
    //     bundle.build('build.js')
    //    const calls = fs.writeFileSync.mock.calls
    //    expect(calls[0][0]).toBe('build.js')
    //    expect(calls[0][1]).toBe('console.log(1)')
    // })
    // test("多条语句",()=>{
    //     const bundle = new Bundle({entery:'./a.js'})
    //     fs.readFileSync.mockReturnValueOnce(`const a =()=> 1;
    //     const b= ()=>2;
    //     a();
    //     `)
    //     fs.writeFileSync.mock.calls=[]
    //     bundle.build('build.js')
    //     const calls  = fs.writeFileSync.mock.calls
    //     console.log(calls)
    //     expect(calls[0][0]).toBe('build.js')
    //     expect(calls[0][1]).toBe(`const a =()=> 1;\na();`)
    // })
    test("多模块",()=>{
        const build = new Bundle({entery:'index.js'})
        fs.readFileSync.mockReturnValueOnce(`import {a} from './a';
        a()`)
        fs.readFileSync.mockReturnValueOnce(`export const a=()=>1;`)
        fs.writeFileSync.mock.calls=[]
        build.build('build.js')
        const calls  =fs.writeFileSync.mock.calls
        console.log(calls)
        expect(calls[0][0]).toBe('build.js')
        expect(calls[0][1]).toBe(`const a=()=>1;\na()`)
    })
})