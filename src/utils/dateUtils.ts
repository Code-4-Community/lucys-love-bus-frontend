export function convertToYearMonthDateString(d: Date): string {
  return d.toISOString().split('T')[0];
}
