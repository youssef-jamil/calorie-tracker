/**
 * Converts a "YYYY-MM-DD" string into a UTC-midnight Date object.
 * Using Date.UTC prevents timezone offset from shifting the date
 * backward in UTC+ environments (e.g. Cairo UTC+2).
 */
export function getDateFromString(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export default getDateFromString;
