export const convertDateToYearMonthStr = (jsTimestamp: number) => {
  const dateObj = new Date(jsTimestamp * 1000);
  // const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  return `${year}年${month}月`;
};
