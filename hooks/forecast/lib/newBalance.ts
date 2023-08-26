export function newBalance(
  balance: number,
  income: number,
  expenses: number
): number {
  let balanceTotal: number = balance + income - expenses;
  return Number(balanceTotal.toFixed(2));
}
