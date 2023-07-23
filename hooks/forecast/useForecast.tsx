import { useState } from "react";
import dayjs from "dayjs";
import {
  refreshDates,
  repeatedEntries,
  determineForecastDuration,
} from "./lib";
import { incomePlaceholder, expensesPlaceholder } from "./lib/vars";
import { ExpenseEntry, ForecastEntry, IncomeEntry } from "@budget/types";
import createBalance from "./lib/createBalance";

export function useForecastBudget() {
  const [forecastList, setForecastList] = useState<ForecastEntry[]>([]);

  function forecastBudget(length: number, startDate: string, stringData: any) {
    let data = JSON.parse(stringData);

    const rawBalance = data.filter((entry: any) => entry.type === "balance");
    const balanceLength = rawBalance.length;

    const rawIncome = data.filter((entry: any) => entry.type === "income");
    const rawExpenses = data.filter((entry: any) => entry.type === "expenses");

    const freshIncome = refreshDates(rawIncome);
    const freshExpenses = refreshDates(rawExpenses);

    const repeatedIncome = repeatedEntries(freshIncome, length);
    const repeatedExpenses = repeatedEntries(freshExpenses, length);

    const forecastStartDate: String = dayjs(startDate).format("MM/DD/YYYY");
    const startDateDayjs = dayjs(startDate);

    let forecastList: ForecastEntry[] = [];

    for (let i = 0; i < length; i++) {
      let newDate = startDateDayjs.add(i + 1, "day").format("MM/DD/YYYY");
      let newBalance = rawBalance[balanceLength - 1].amount;

      const forecastedBalance = createBalance(
        forecastList[i].balance,
        repeatedIncome,
        repeatedExpenses,
        newDate,
        i,
        newBalance
      );

      const forecastEntry = {
        date: newDate,
        balance: forecastedBalance.balance,
        incomes: [forecastBudget[i]?.incomes || incomePlaceholder],
        expenses: [forecastBudget[i]?.expenses || expensesPlaceholder],
      };
      forecastList.push(forecastEntry);
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
