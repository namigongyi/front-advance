
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
    it("condition is true",()=>{
        const ast = Parse(`
        let b = 0;
        for(i=0;i<10;i++;){
            b = b+1;
        }
        `)
        console.log(JSON.stringify(ast[0]))
        const result = Evaluate(ast[0])
        console.log(globalEnv,'after globalEnv')
        // expect(result).toBe(2)
    }) 
    it("if",()=>{//今晚的练习
        const ast = Parse(`
       if(true){
        a= 1;
        b= 1
       }
        `)
        const result = Evaluate(ast[0])
        // expect(result).toBe(2)
    }) 
    it("break",()=>{//这个没搞定
        const ast = Parse(`
        for(i=0;i<10;i++;){
            if(i>6){
                break;
            }
        }
        `)
        const result = Evaluate(ast[0])
        // console.log(result)
        console.log(globalEnv,'after globalEnv')

        // expect(result).toBe(2)
    }) 
    it("logical or",()=>{//今晚的练习
        // const ast = Parse(`let a= 0 || 2`)
        const ast = Parse(`let a= 1 || 2`)
        console.log(JSON.stringify(ast[0]))
        const result = Evaluate(ast[0])
        console.log(globalEnv,'after globalEnv')
        // expect(result).toBe(2)
    }) 

    
});