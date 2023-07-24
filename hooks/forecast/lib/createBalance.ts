import dayjs, { Dayjs } from "dayjs";
import {
  BudgetEntry,
  BudgetEntryRepeats,
  ExpenseEntry,
  ForecastEntry,
  IncomeEntry,
} from "@budget/types";
import { dateFilter } from "./dateFilter";
import { calcTotal } from "./totals";

export function createBalance(
  balance: number,
  incomes: BudgetEntryRepeats[],
  expenses: BudgetEntryRepeats[],
  date,
  i,
  startingBalance
): ForecastEntry {
  const dateIncomes = dateFilter(incomes, date);
  const dateExpenses = dateFilter(expenses, date);
  const incomeTotal = calcTotal(dateIncomes);
  const expenseTotal = calcTotal(dateExpenses);

  function newBalance(
    balance: number,
    income: number,
    expenses: number
  ): number {
    return balance + income - expenses;
  }

  if (i === 0) {
    return {
      date: date as string | Dayjs,
      balance: startingBalance,
      incomes: incomes as BudgetEntryRepeats[],
      expenses: expenses as BudgetEntryRepeats[],
    };
  } else {
    return {
      date: date as string | Dayjs,
      balance: newBalance(
        i > 0 ? balance : startingBalance,
        incomeTotal,
        expenseTotal
      ),
      incomes: incomes as BudgetEntryRepeats[],
      expenses: expenses as BudgetEntryRepeats[],
    };
  }
}
