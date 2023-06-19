const Module = require("../src/ran/module")

describe('测试module', () => {
    describe('imports', () => {
        it('Import', () => {
            const code = "import a from '../src/ran/module'"
            const module = new Module({ code })
            expect(module.imports).toEqual({
                a: {
                    localName: 'a',
                    name: '',
                    source: "../src/ran/module"
                }
            })
        })

    //     it('Import 解构', () => {
    //         const code = "import {a as b} from '../src/ran/module'"
    //         const module = new Module({ code })
    //         expect(module.imports).toEqual({
    //             b: {
    //                 localName: 'b',
    //                 name: 'a',
    //                 source: "../src/ran/module"
    //             }
    //         })
        })
        // it('多个import', () => {
        //     const code = `import {a as aa ,b }  from '../module'`
        //     const module = new Module({ code })
        //     expect(module.imports).toEqual({
        //         aa: {
        //             'localName': 'aa',
        //             'name': 'a',
        //             'source': '../module'
        //         },
        //         b: {
        //             'localName': 'b',
        //             'name': 'b',
        //             'source': '../module'
        //         }
        //     })
        // })
        // describe('exports', () => {
        //     it('单个export', () => {
        //         const code = `export var a = 1`
        //         const module = new Module({ code })
        //         expect(module.exports['a'].localName).toBe('a')
        //         expect(module.exports['a'].node).toBe(module.ast.body[0])
        //         expect(module.exports['a'].expression).toBe(module.ast.body[0].declaration)
        //     })

        // })


        // describe('definitions', () => {
        //     it('单个变量', () => {
        //         const code = `const a = 1
        //                       const b=2
        //                         `
        //         const module = new Module({ code })
        //         expect(module.definitions).toEqual({
        //             a:module.ast.body[0],
        //             b:module.ast.body[1]
        //         })
        //     })
        // })

        // describe('ExpandAllStatement', () => { //返回用过的部分
        //     it('基础', () => {
        //         const code =
        //             `const a = () =>  1;
        //              const b = () =>  2;
        //              a();`
        //         const module = new Module({ code })
        //         const statements = module.expandAllStatement()
        //         expect(statements.length).toBe(2)

        //         expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
        //         expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)

        //     })


        // })

        // describe("基础两次+console",()=>{
        //     const code=`
        //     const a= ()=>1;
        //     const b=()=>2;
        //     a();
        //     a();
        //     `
        //     const module= new Module({code})
        //     const statements=module.expandAllStatement()
        //     expect(statements.length).toBe(3)
        //     expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a= ()=>1;`)
        //     expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)
        //     expect(module.code.snip(statements[2].start, statements[2].end).toString()).toEqual(`a();`)


        // })  
        describe("递归调用",()=>{
            const code=`
            const a=()=>1;
            const b=()=>a()+1;
            b();
            `
            const module= new Module({code})
            const statements=module.expandAllStatement()
            expect(statements.length).toBe(3)
            expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a=()=>1;`)
            expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`const b=()=>a()+1;`)
            expect(module.code.snip(statements[2].start, statements[2].end).toString()).toEqual(`b();`)


        })  
    // })

})