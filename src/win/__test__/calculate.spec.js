const Calculate =require('../20230204')

describe("Calculate", () => {
    it("*+-/", () => {
        const str = '1+2/3*9+7*44'
        const res = Calculate(str)
        expect(res).toEqual('1+2/3*9+7*44')
    });
    it("*+-/()", () => {
        const str = '(1+2)/3*9+7*44'
        const res = Calculate(str)
        expect(res).toEqual('(1+2)/3*9+7*44')
    });

});


