
const JSParse = require('../LR/20230415')
describe('JSParse', () => {
    it('number',()=>{
        const str = 'const a = 1'
        const {list,group} = JSParse(str)
        expect(list.length).toBe(4)
        expect(group.keyword).toBe('const')
        expect(group.identifier).toBe('a')
        expect(group.operator).toBe('=')
        expect(group.number).toBe('1')

    })
    it("string",()=>{
        const str = 'let string = new RegExp()'
        const {list,group} = JSParse(str)

        console.log(list)
        console.log(group)
    })
    it('new',()=>{
        const str = 'let string = '
    })
});