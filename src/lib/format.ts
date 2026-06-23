export const currencySymbol: Record<string, string> = {
  USD: "$",
  AED: "AED ",
  SAR: "SAR ",
  PKR: "₨ ",
  GBP: "£",
};

export function formatPrice(amount: number, currency = "USD"): string {
  const symbol = currencySymbol[currency] ?? "";
  return `${symbol}${amount.toLocaleString()}`;
}
