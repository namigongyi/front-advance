
const {Parse} = require('../LR/20230513')
const {Evaluate,globalEnv} = require('../LR/20230513Evaluate')
describe('Test evaluator', () => {
  
    it("a++",()=>{
        const ast = Parse(`let a=1;a++`)
        const result = Evaluate(ast[0])
        expect(result).toBe(2)
    }) 
    it(">/<",()=>{
        const ast = Parse(`
        let i= 0;
        for(i=0;i<10;i++;){

        }
        `)
        const result = Evaluate(ast[0])
        expect(result).toBe(10)
    }) 
    it("condition is true",()=>{//今晚的练习
        const ast = Parse(`
        let b =0;
        for(let i=0;i<10;i++;){
            b = b+1;
        }
        `)
        const result = Evaluate(ast[0])
        console.log(globalEnv,'after globalEnv')
        // expect(result).toBe(2)
    }) 
});