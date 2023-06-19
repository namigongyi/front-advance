// import { find2 } from "../20230211";
//
const { find2 ,kmp,check} = require('../20230211')
const { kmpCheck} = require('../20230211homeWork')
describe('Text', () => {
    test('Find2', () => {
        let result = find2('ababababababaac', 'abc')
        expect((result)).toBe(-1)
        result = find2('abcabcabe', 'abc')
        expect((result)).toBe(0)
        result = find2('abcabcabd', 'abd')
        expect((result)).toBe(6)
    });

    test("KMP",()=>{
        let result = kmp('abababc','ababc')
        expect(result).toBe(2)
    })
    
    // test("check状态机",()=>{ ///source 无重复
    //     let result = check('abcde')
    //     expect(result).toBe(true)
    // })

    test("check状态机2",()=>{//source 重复
        let  result = check('abababc')
        expect(result).toBe(true)
    })
    test("check状态机作业",()=>{//source 重复
        let  source ='abababababc'
        let pattern = 'ababc'
        let res=  kmpCheck(source,pattern)
        expect(res).toBe(true)
    })
});
