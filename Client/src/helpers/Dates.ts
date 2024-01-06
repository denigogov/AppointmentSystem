import moment from "moment-timezone";

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

  return format; // Mon, 18 Dec 2023
};

export const convertISOtoLocalZone = (date: Date | string) => {
  const localDate = moment(date);
  return localDate.toISOString(); // 2024-01-14T23:00:00.000Z
};

export const convertISOtoLocalZoneFORMATED = (date: Date | string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = moment(date).tz(userTimeZone);
  return localDate.format("ddd, DD MMM YYYY HH:mm"); // Mon, 18 Dec 2023 13:10
};

export const calculateDaysLeft = (date: Date | string | undefined) => {
  const dates = date ?? "";
  const convertingToDate = new Date(dates);
  const startDate = new Date();
  const endDate = convertingToDate;
  const daysBetween = calcDaysBetween(startDate, endDate);
  const nonNegativeDays = daysBetween >= 0 ? daysBetween : null;

  return nonNegativeDays; // 5 days left | 5 days ago
};

// export const getStartDateAndEndDateCurrentMonth = () => {
//   // Get the current date
//   const currentDate = moment();
//   const startDate = currentDate.clone().startOf("month");
//   const endDate = currentDate.clone();

//   // Format Date
//   const formattedStartDate = startDate.format("YYYY-MM-DD HH:mm:ss");
//   const formattedEndDate = endDate.format("YYYY-MM-DD HH:mm:ss");

//   return { startDate: formattedStartDate, endDate: formattedEndDate };
// };
