const Scope = require('../src/ran/scope')
describe('Test scope',()=>{
    test('基本功能',()=>{
        // const a=1;
        // function f(){
        //     const b=2
        // }
        const root =new Scope()
        root.add('a')
        const child=new Scope({parent:root})
        child.add('b')
        expect(child.contains('a')).toBe(true)
        expect(child.contains('b')).toBe(true)
        expect(child.findDefiningScope('a')).toBe(root)
        expect(child.findDefiningScope('b')).toBe(child)

    })
    test("跨层级测试",()=>{
        const root =new Scope()
        root.add('a')
        const child=new Scope({parent:root})
        child.add('b')
        const grandChild = new Scope({parent:child})
        grandChild.add('c')
        expect(grandChild.contains('a')).toBe(true)
        expect(grandChild.contains('b')).toBe(true)
        expect(grandChild.contains('c')).toBe(true)
        expect(grandChild.findDefiningScope('a')).toBe(root)
        expect(grandChild.findDefiningScope('b')).toBe(child)
        expect(grandChild.findDefiningScope('c')).toBe(grandChild)
    })
})
