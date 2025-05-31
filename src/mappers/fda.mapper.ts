export const convertDateRange = (
  start: string | undefined | null,
  end: string | undefined | null
): string | undefined => {
  if (start || end) {
    const s = start || '1900-01-01';
    const e = end || new Date().toISOString().split('T')[0];
    return `[${s.replace(/-/g, '')} TO ${e.replace(/-/g, '')}]`;
  }
  return undefined;
};
