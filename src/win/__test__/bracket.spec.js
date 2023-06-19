const {isVaild} = require("../bracket")
describe('bracket test', () => {
    test('isvaild ', () => {
        expect(isVaild(['[', ']', '{', "}", "(", ")"])).toBe(true)
    });
    test('isvaild2 ', () => {
        expect(isVaild(['{', '[', "}", "(", ")"])).toBe(false)
    });

});