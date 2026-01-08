export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 2 }).format(value);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium' }).format(new Date(value));
