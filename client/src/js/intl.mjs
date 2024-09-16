export function nice_date(date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    date instanceof Date ? date : new Date(date),
  );
}
