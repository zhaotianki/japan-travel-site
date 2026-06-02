export function formatCurrency(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value?: Date | string | null) {
  if (!value) return "日期待定";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function durationLabel(hours: number) {
  if (hours < 1) return `${Math.round(hours * 60)} 分钟`;
  if (Number.isInteger(hours)) return `${hours} 小时`;
  return `${hours.toFixed(1)} 小时`;
}
