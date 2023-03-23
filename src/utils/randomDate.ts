export function getRandomDate(): Date {
  const maxDate: number = Date.now();
  const timestamp: number = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
}
