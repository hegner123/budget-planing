import dayjs, { Dayjs } from "dayjs";
import {
  BudgetEntry,
  BudgetEntryRepeats,
  ExpensePeek,
  ForecastEntry,
  IncomePeek,
} from "@budget/types";
import { dateFilter } from "./dateFilter";
import { calcTotals } from "./totals";
import { newBalance } from "./newBalance";

export function createBalance(
  balance: number,
  incomes: BudgetEntryRepeats[],
  expenses: BudgetEntryRepeats[],
  date
): ForecastEntry {
  const dateIncomes: BudgetEntryRepeats[] = dateFilter(incomes, date);
  const dateExpenses: BudgetEntryRepeats[] = dateFilter(expenses, date);
  const incomeTotal = calcTotals(dateIncomes);
  const expenseTotal = calcTotals(dateExpenses);

  const mappedIncomes: IncomePeek[] = dateIncomes.map((income) => {
    return {
      name: income.name,
      amount: income.amount,
      repeated: income.repeated,
    };
  });
  const mappedExpenses: ExpensePeek[] = dateExpenses.map((expense) => {
    return {
      name: expense.name,
      amount: expense.amount,
      repeated: expense.repeated,
    };
  });

  return {
    date: date as string | Dayjs,
    balance: newBalance(
      balance as number,
      incomeTotal as number,
      expenseTotal as number
    ),
    balanceDetails: {
      previousBalance: balance as number,
      newBalance: newBalance(
        balance as number,
        incomeTotal as number,
        expenseTotal as number
      ),
      incomesTotal: incomeTotal as number,
      incomes: mappedIncomes as IncomePeek[],
      expensesTotal: expenseTotal as number,
      expenses: mappedExpenses as ExpensePeek[],
    },
  };
}

