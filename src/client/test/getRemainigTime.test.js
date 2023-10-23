const {getRemainigTime} = require('../js/getRemainingTime');

const today = new Date();

test('input date subtracted from today date', () => {
    expect(getRemainigTime(today)).toBe(0);
});