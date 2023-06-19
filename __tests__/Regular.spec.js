describe('正则函数',()=>{
    test('含小数的10位数匹配',()=>{
      const match =  require('../src/math')
      expect(match('-11')).toBe(true)
      expect(match('-11.33')).toBe(true)
      expect(match('11.0')).toBe(true)
      expect(match('sdja')).toBe(false)
      expect(match('.9')).toBe(true)
      expect(match('11.')).toBe(true)

    })
})