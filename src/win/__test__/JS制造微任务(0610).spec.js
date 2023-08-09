
const {Parse} = require('../LR/20230513')
const {Evaluate,globalEnv} = require('../LR/20230513Evaluate')
describe('Test evaluator', () => {
  
    it("a++",()=>{
        const ast = Parse(`let a=1;a++`)
        const result = Evaluate(ast[0])
        expect(result).toBe(2)
    }) 
    it(">/<",()=>{
        const ast = Parse(`for(i = 0; i; i++){}
        `)
        console.log(JSON.stringify(ast[0]))
        // const result = Evaluate(ast[0])
        // expect(result).toBe(2)
    }) 
});