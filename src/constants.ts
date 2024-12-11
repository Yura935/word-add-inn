export const validatorsRegExp = {
  nm: /^[\d]+$/,
  dt: {
    "month/day/year": /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(\d{4})$/,
    "year/month/day": /^(\d{4})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/,
    "day/month/year": /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/,
    "month-day-year": /^(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])-(\d{4})$/,
    "year-month-day": /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/,
    "day-month-year": /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-(\d{4})$/,
  },
  tx: /^[\p{L}\p{N}\p{P}\p{S}\p{Z}\p{M}\n\r]*$/u,
};

export const errorMessages = {
  nm: "Only numbers are allowed",
  dt: "Date format is incorrect",
  tx: "Only text is allowed",
  empty: "Field is empty",
};

export const Validators = ["nm", "dt", "tx"];

export enum Flags {
  "m",
  "o",
}
