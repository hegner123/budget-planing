import dayjs, { Dayjs } from "dayjs";
import { ExpenseEntry, IncomeEntry } from "@budget/types";
import { incomeDateFilter, expenseDateFilter } from "./dateFilter";
import { calcIncomeTotal, calcExpenseTotal } from "./totals";

export default function createBalance(
  balance: number,
  incomes,
  expenses,
  date,
  i,
  startingBalance
) {
  const dateIncomes = incomeDateFilter(incomes, date);
  const dateExpenses = expenseDateFilter(expenses, date);
  const incomeTotal = calcIncomeTotal(dateIncomes);
  const expenseTotal = calcExpenseTotal(dateExpenses);
  const newBalance = startingBalance + incomeTotal - expenseTotal;

  if (i === 0) {
    return {
      date: date,
      balance: startingBalance,
      incomes: dateIncomes as IncomeEntry[],
      expenses: dateExpenses as ExpenseEntry[],
    };
  } else {
    return {
      date: date as string | Dayjs,
      balance: newBalance as number,
      income: dateIncomes as IncomeEntry[],
      expenses: dateExpenses as ExpenseEntry[] as ExpenseEntry[],
    };
  }
}
