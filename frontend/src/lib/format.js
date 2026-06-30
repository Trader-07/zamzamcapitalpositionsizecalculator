// Indian-style number formatting helpers

export const formatINR = (value, opts = {}) => {
  const { decimals = 0, showSymbol = true } = opts;
  if (value === null || value === undefined || Number.isNaN(value)) {
    return showSymbol ? '₹—' : '—';
  }
  const num = Number(value);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(num);
  return showSymbol ? `₹${formatted}` : formatted;
};

export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(Number(value));
};

export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return `${Number(value).toFixed(decimals)}%`;
};

// Parse user input allowing null (empty) and decimal values.
export const parseDecimal = (raw) => {
  if (raw === null || raw === undefined) return null;
  const trimmed = String(raw).trim();
  if (trimmed === '' || trimmed === '-' || trimmed === '.') return null;
  // allow only digits, dot, comma (treated as separator) and minus
  const sanitized = trimmed.replace(/,/g, '');
  const num = Number(sanitized);
  if (Number.isNaN(num)) return null;
  return num;
};
