import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  subDays,
  isToday,
  isSameDay,
  parseISO,
  differenceInCalendarDays,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  subMonths,
} from 'date-fns';

export function today(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatDisplay(date: string): string {
  return format(parseISO(date), 'MMM d, yyyy');
}

export function formatShort(date: string): string {
  return format(parseISO(date), 'MMM d');
}

export function getWeekDays(date: Date = new Date()): Date[] {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
}

export function getMonthDays(date: Date = new Date()): Date[] {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
}

export function getMonthsBack(count: number): Date[] {
  const now = new Date();
  return eachMonthOfInterval({
    start: subMonths(now, count - 1),
    end: now,
  });
}

export function isAttendedOnDate(dates: string[], date: Date): boolean {
  const dateStr = format(date, 'yyyy-MM-dd');
  return dates.includes(dateStr);
}

export function calculateStreak(attendedDates: string[]): number {
  if (attendedDates.length === 0) return 0;

  const sorted = [...attendedDates].sort().reverse();
  const todayStr = today();

  // Check if the user attended today or yesterday to have an active streak
  const latest = sorted[0];
  if (latest !== todayStr && latest !== format(subDays(new Date(), 1), 'yyyy-MM-dd')) {
    return 0;
  }

  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = parseISO(sorted[i]);
    const next = parseISO(sorted[i + 1]);
    const diff = differenceInCalendarDays(current, next);
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function getWeekDates(date: Date = new Date()): string[] {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  }).map(d => format(d, 'yyyy-MM-dd'));
}

export { isToday, isSameDay, format, parseISO };
