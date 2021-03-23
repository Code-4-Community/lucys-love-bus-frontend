import { convertToYearMonthDateString } from '../dateUtils';

describe('get year month date string from a Date', () => {
  it('converts a standard Date object to the correct YYYY-MM DD-string', () => {
    const d: Date = new Date('2021-03-20');
    expect(convertToYearMonthDateString(d)).toEqual('2021-03-20');
  });
});
