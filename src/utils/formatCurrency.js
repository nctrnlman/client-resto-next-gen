export const formatCurrency = (amount) => {
  return `IDR ${parseFloat(amount).toLocaleString()}`;
};
