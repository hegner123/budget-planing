import dayjs, { Dayjs } from "dayjs";
import {
  BudgetEntry,
  BudgetEntryRepeats,
  ExpenseEntry,
  ForecastEntry,
  IncomeEntry,
} from "@budget/types";
import { dateFilter } from "./dateFilter";
import { calcTotals } from "./totals";
import { newBalance } from "./newBalance";

export function createBalance(
  balance: number,
  incomes: BudgetEntryRepeats[],
  expenses: BudgetEntryRepeats[],
  date,
  i,
  startingBalance
): ForecastEntry {
  const dateIncomes: BudgetEntryRepeats[] = dateFilter(incomes, date);
  const dateExpenses: BudgetEntryRepeats[] = dateFilter(expenses, date);
  const incomeTotal = calcTotals(dateIncomes);
  const expenseTotal = calcTotals(dateExpenses);

  if (i === 0) {
    return {
      date: date as string | Dayjs,
      balance: startingBalance,
      incomes: dateIncomes as BudgetEntryRepeats[],
      expenses: dateExpenses as BudgetEntryRepeats[],
    };
  } else {
    return {
      date: date as string | Dayjs,
      balance: newBalance(
        i > 0 ? balance : (startingBalance as number),
        incomeTotal as number,
        expenseTotal as number
      ),
      incomes: dateIncomes as BudgetEntryRepeats[],
      expenses: dateExpenses as BudgetEntryRepeats[],
    };
  }
}
