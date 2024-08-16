export const formatCurrencyToIDR = (value) => {
  if (typeof value !== "string") return value;
  const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  if (isNaN(numberValue)) return value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(numberValue);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return dateString;
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
