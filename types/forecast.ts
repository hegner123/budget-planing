import { Dayjs } from "dayjs";
import { BudgetEntryRepeats } from "./budget";

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
  incomes: BudgetEntryRepeats[];
  expenses: BudgetEntryRepeats[];
}
