/**
 * @example 1100 -> "18:20"
 */

export function convertMinutesToHourString(minutes: number): string {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");

  const newMinutes = Math.round(minutes % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${newMinutes}`;
}
