import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function todayDate() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC 시간에 9시간을 더합니다.
  const koreanDateISO = koreaTime.toISOString().slice(0, 10);

  return koreanDateISO;
}

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
