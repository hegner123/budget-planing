import { Dayjs } from "dayjs";
import { ExpenseEntry } from "./expenses";
import { IncomeEntry } from "./income";

export interface ForecastLength {
  days: Number;
  hours: Number;
  milliseconds: Number;
  minutes: Number;
  months: Number;
  seconds: Number;
  years: Number;
}

export interface ForecastEntry {
  date: String | Dayjs;
  balance: String;
  incomes: IncomeEntry[];
  expenses: ExpenseEntry[];
}
