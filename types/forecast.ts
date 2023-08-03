import { Dayjs } from "dayjs";
import { BudgetEntryRepeats } from "./budget";
import { IncomePeek } from "./income";
import { ExpensePeek } from "./expenses";

export interface ForecastLength {
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  months: number;
  seconds: number;
  years: number;
}

export interface ForecastEntry {
  date: String | Dayjs;
  balance: number;
  balanceDetails: balanceDetails;
}

interface balanceDetails {
  previousBalance: number;
  newBalance: number;
  incomesTotal: number;
  incomes: IncomePeek[];
  expensesTotal: number;
  expenses: ExpensePeek[];
}