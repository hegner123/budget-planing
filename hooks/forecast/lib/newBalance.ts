export function newBalance(
  balance: number,
  income: number,
  expenses: number
): number {
  let balanceTotal: number = balance + income - expenses;
  return balanceTotal.toFixed(2) as unknown as number;
}
