import { IncomeEntry, ExpenseEntry } from "@budget/types";

export function calcIncomeTotal(dateIncomes: IncomeEntry[]): number {
  return dateIncomes.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
}

export function calcExpenseTotal(dateExpenses: ExpenseEntry[]): number {
  return dateExpenses.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
}
