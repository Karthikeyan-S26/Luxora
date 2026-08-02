export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (!amount && amount !== 0) return '₹0';
  // Convert USD scale pricing (< 5000) to INR at ₹83 / $1 for clean Indian Rupee display
  const inrAmount = amount < 5000 ? Math.round(amount * 83) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrAmount);
}

export function formatDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
