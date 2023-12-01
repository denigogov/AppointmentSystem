export const calcDaysBetween = (StartDate: Date, EndDate: Date) => {
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(
    EndDate.getFullYear(),
    EndDate.getMonth(),
    EndDate.getDate()
  );
  const end = Date.UTC(
    StartDate.getFullYear(),
    StartDate.getMonth(),
    StartDate.getDate()
  );

  return (start - end) / oneDay;
};

export const dataMonthShow = (selectedData: Date | string) => {
  const format = new Date(selectedData).toUTCString().slice(0, 17);

  return format;
};
