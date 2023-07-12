const { getClosure } = require('../LR/20230311LR')
const { parse } = require('../LR/20230325LR2')

describe('LR', () => {
    it('closure ', () => {
        const res = getClosure('Expression')
        expect(res).toEqual([
            { closure: [ 'Additive' ], '$reduce': 'Expression' },
            { closure: [ 'Multiplicative' ], '$reduce': 'Additive' },
            {
              closure: [ 'Additive', '+', 'Multiplicative' ],
              '$reduce': 'Additive'
            },
            {
              closure: [ 'Additive', '-', 'Multiplicative' ],
              '$reduce': 'Additive'
            },
            { closure: [ 'Primary' ], '$reduce': 'Multiplicative' },
            {
              closure: [ 'Multiplicative', '*', 'Primary' ],
              '$reduce': 'Multiplicative'
            },
            {
              closure: [ 'Multiplicative', '/', 'Primary' ],
              '$reduce': 'Multiplicative'
            },
            { closure: [ 'Number' ], '$reduce': 'Primary' },
            { closure: [ '(', 'Expression', ')' ], '$reduce': 'Primary' }
          ])
    });
    /**
     * 设计一个单测可以检测循环对象的结构是否相等
     * 思路1. 变成key的字符串结构进行检测
     * 思路2.对象变成一个图，检测两个有向图是否相同，属性指向 =  边，检测两张有向图是否同构 => 是否具有相同的点和边
     * 单测基础设施搭建
     */

    it("LR2",()=>{
        const res =  parse('1+2')
        expect(JSON.stringify(res)).toEqual(JSON.stringify(res))
    })

});