import day from "dayjs";

export const computeYearsMonthsDaysForTimePassed = (date) => {
  let startDate = day(date);
  let currentDate = day();
  let years = currentDate.diff(startDate, "year");
  let months = currentDate.diff(startDate, "month") - years * 12;
  const days = currentDate.diff(
    startDate.add(years, "year").add(months, "month"),
    "day"
  );

  let computedString = "";

  if (years > 0) {
    computedString = computedString
      .concat(years)
      .concat(years > 1 ? " years" : " year")
      .concat(months || days > 0 ? ", " : "");
  }

  if (months > 0) {
    computedString = computedString
      .concat(months)
      .concat(months > 1 ? " months" : " month")
      .concat(months || days > 0 ? ", " : "");
  }

  if (days >= 0) {
    computedString = computedString
      .concat(days)
      .concat(days > 1 ? " days " : " day ");
  }

  //   if (currentDate.diff(startDate, "day") > 0) {
  //     computedString = computedString
  //       .concat("(Total Days: ")
  //       .concat(currentDate.diff(startDate, "day"))
  //       .concat(")");
  //   }

  return computedString;
};

export const computeYearsMonthsDaysForTimeLeft = (date) => {
  let startDate = day(date);
  let currentDate = day();
  let years = startDate.diff(currentDate, "year");
  let months = startDate.diff(currentDate, "month") - years * 12;
  const days = startDate.diff(
    currentDate.add(years, "year").add(months, "month"),
    "day"
  );

  let computedString = "";

  if (years > 0) {
    computedString = computedString
      .concat(years)
      .concat(years > 1 ? " years" : " year")
      .concat(months || days > 0 ? ", " : "");
  }

  if (months > 0) {
    computedString = computedString
      .concat(months)
      .concat(months > 1 ? " months" : " month")
      .concat(months || days > 0 ? ", " : "");
  }

  if (days >= 0) {
    computedString = computedString
      .concat(days)
      .concat(days > 1 ? " days " : " day ");
  }

  //   if (currentDate.diff(startDate, "day") > 0) {
  //     computedString = computedString
  //       .concat("(Total Days: ")
  //       .concat(currentDate.diff(startDate, "day"))
  //       .concat(")");
  //   }

  return computedString;
};

export const isSelDateGtThanCurrDate = (date) => {
  let startDate = day(date);
  let currentDate = day();

  return startDate > currentDate;
};

export const isSelDateLsThanCurrDate = (date) => {
  let startDate = day(date);
  let currentDate = day();

  return startDate <= currentDate;
};

export const convertDate = (paymentDate) => {
  var d = new Date(paymentDate),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const currentDate = () => {
  return new Date().toISOString().slice(0, 10);
};
