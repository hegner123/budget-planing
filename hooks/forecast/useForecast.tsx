import { useState } from "react";
import dayjs from "dayjs";
import {
  refreshDates,
  repeatedEntries,
  determineForecastDuration,
} from "./lib";
import { incomePlaceholder, expensesPlaceholder } from "./lib/vars";
import {
  BudgetEntry,
  BudgetEntryRepeats,
  ExpenseEntry,
  ForecastEntry,
  IncomeEntry,
} from "@budget/types";
import { forecastBudget } from "./lib";
import { createBalance } from "./lib/createBalance";

export function useForecastBudget() {
  const [forecastList, setForecastList] = useState<ForecastEntry[]>([]);

  return { forecastBudget };
}


export const RepeatedDefaults = [
  "None",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Yearly",
];
