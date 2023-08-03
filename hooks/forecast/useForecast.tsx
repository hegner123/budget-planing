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
import { createBalance } from "./lib/createBalance";

export function useForecastBudget() {
  const [forecastList, setForecastList] = useState<ForecastEntry[]>([]);

  function forecastBudget(length: number, startDate: string, stringData: any) {
    console.log("length", length);
    console.log("startDate", startDate);
    console.log("stringData", stringData);
    let data: BudgetEntry[] = JSON.parse(stringData);

    const rawBalance: BudgetEntry[] = data.filter(
      (entry: BudgetEntry) => entry.type === "balance"
    );
    const balanceLength = rawBalance.length;

    const rawIncome: BudgetEntry[] = data.filter(
      (entry: BudgetEntry) => entry.type === "income"
    );
    const rawExpenses: BudgetEntry[] = data.filter(
      (entry: BudgetEntry) => entry.type === "expenses"
    );

    const freshIncome: BudgetEntry[] = refreshDates(rawIncome as BudgetEntry[]);
    const freshExpenses: BudgetEntry[] = refreshDates(
      rawExpenses
    ) as BudgetEntry[];

    const repeatedIncome: BudgetEntryRepeats[] = repeatedEntries(
      freshIncome as BudgetEntry[],
      length as number
    );
    const repeatedExpenses: BudgetEntryRepeats[] = repeatedEntries(
      freshExpenses as BudgetEntry[],
      length as number
    );

    const forecastStartDate: String = dayjs(startDate).format("MM/DD/YYYY");
    const startDateDayjs = dayjs(startDate);

    let forecastList: ForecastEntry[] = [];

    for (let i: number = 0; i < length; i++) {
      let newDate: string = startDateDayjs
        .add(i + 1, "day")
        .format("MM/DD/YYYY");
      let newBalance: number = rawBalance[balanceLength - 1].amount;

      const forecastedBalance: ForecastEntry = createBalance(
        forecastList[i]?.balance || (newBalance as number),
        repeatedIncome as BudgetEntryRepeats[],
        repeatedExpenses as BudgetEntryRepeats[],
        newDate as string,
        i as number,
        newBalance as number
      );

      forecastList.push(forecastedBalance);
    }
    if (forecastList.length > 2) {
      setForecastList(forecastList);
    }

    return forecastList;
  }
  return { forecastBudget };
}


export const RepeatedDefaults = [
  "None",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Yearly",
];
