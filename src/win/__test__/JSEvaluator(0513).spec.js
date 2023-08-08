
const {Parse} = require('../LR/20230513')
const {Evaluate,globalEnv} = require('../LR/20230513Evaluate')
describe('Test evaluator', () => {
    it('new Class()',()=>{
        const result = Parse('new Foo()')
        expect(result).toEqual( [{"type":"StatementList","children":[{"type":"StatementListItem","children":[{"type":"Statement","children":[{"type":"ExpressionStatement","children":[{"type":"Expression","children":[{"type":"AssignmentExpression","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"LeftHandSideExpression","children":[{"type":"CallExpression","children":[{"val":"new","type":"new"},{"type":"MemberExpression","children":[{"type":"Primary","children":[{"val":"Foo","type":"Identifier"}]}]},{"val":"(","type":"("},{"val":")","type":")"}]}]}]}]}]}]},{"type":";","value":";"}]}]}]}]},{"type":"EOF"}])
    })
    it('1+1 evaluator', () => {
        const ast = Parse('1+1')
        const result = Evaluate(ast[0])
        expect(result).toBe(2)
    });
    it("let a =1;",()=>{
        const ast = Parse(`let a =1 ;`)
        console.log(globalEnv,'globalEnv')

        const result = Evaluate(ast[0])
        console.log(result)
        console.log(globalEnv,'after run globalEnv')
        expect(result).toBe(1)
    })
    it("Nested blocks",()=>{
        const ast = Parse(`let a =1;a= a+1`)
        const result = Evaluate(ast[0])
        expect(result).toBe(2)
    })
});