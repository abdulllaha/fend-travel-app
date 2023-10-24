const {validateCity} = require('../../server/validateCity');

//test retrieved name
test('check result length', () => {
    const result = validateCity([1])
    expect(result).toBe(true);
});
