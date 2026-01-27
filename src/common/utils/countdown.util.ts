export function calculateCountdown(endAt: Date) {
  const now = new Date().getTime();
  const end = endAt.getTime();
  const diff = end - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      expired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return {
    days,
    hours,
    minutes,
    expired: false,
  };
}
