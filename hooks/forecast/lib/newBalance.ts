export function newBalance(
  balance: number,
  income: number,
  expenses: number
): number {
  return balance + income - expenses;
}
