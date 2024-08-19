export const formatDate = (date: Date) => {
  // format date to yyyy-mm-dd
  date = new Date(date);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

export const getTodayLastSecond = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

export const addTodayByDays = (day: number) => {
  const someDate = new Date();
  return new Date(someDate.setDate(someDate.getDate() + day));
};
