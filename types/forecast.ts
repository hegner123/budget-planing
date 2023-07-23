import { Dayjs } from "dayjs";
import { ExpenseEntry } from "./expenses";
import { IncomeEntry } from "./income";

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
  incomes: IncomeEntry[];
  expenses: ExpenseEntry[];
}
