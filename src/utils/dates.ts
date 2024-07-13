export const getDayKey = (localDateString: string) =>
  localDateString.substring(0, 10);

export const getWeekKey = (UTCDateString: string) => {
  const date = new Date(UTCDateString);
  date.setDate(date.getDate() - date.getDay());
  return date.toISOString().substring(0, 10);
};

export const getMonthKey = (localDateString: string) =>
  localDateString.substring(0, 7);
