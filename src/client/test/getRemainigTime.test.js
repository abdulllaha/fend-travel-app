const {getRemainigTime} = require('../js/getRemainingTime');

const today = new Date();
//test remaining time
test('input date subtracted from today date', () => {
    expect(getRemainigTime(today)).toBe(0);
});