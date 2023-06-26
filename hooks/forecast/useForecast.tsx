import { useState } from "react";
import dayjs from "dayjs";
import {
  refreshDates,
  repeatedEntries,
  determineForecastDuration,
} from "./lib";
import { ExpenseEntry, ForecastEntry, IncomeEntry } from "@budget/types";

export function useForecastBudget() {
  const today = dayjs().format("MM/DD/YYYY");

  const incomePlaceholder: IncomeEntry = {
    income: 0,
    created_at: today,
    date: today,
    id: 1,
    name: "placeholder",
    repeated: "none",
    user: "placeholder",
    uuid: "placeholder",
  };
  const expensesPlaceholder: ExpenseEntry = {
    amount: 0,
    created_at: today,
    date: today,
    id: 1,
    name: "placeholder",
    repeated: "none",
    user: "placeholder",
    uuid: "placeholder",
  };
  const [forecastList, setForecastList] = useState<ForecastEntry[]>([]);
  function forecastBudget(length: number, startDate: string, stringData: any) {
    // Init forecastList
    let data = JSON.parse(stringData);
    // Filter compiled data into balance, income, and expenses

    const balance = data.filter((entry: any) => entry.type === "balance");
    const rawIncome = data.filter((entry: any) => entry.type === "income");
    const rawExpenses = data.filter((entry: any) => entry.type === "expenses");

    // console.log("rawIncome", rawIncome);

    const freshIncome = refreshDates(rawIncome);
    const freshExpenses = refreshDates(rawExpenses);

    // Create Repeated Income and Expenses

    const repeatedIncome = repeatedEntries(freshIncome, length);
    const repeatedExpenses = repeatedEntries(freshExpenses, length);

    // console.log("repeatedIncome", repeatedIncome);
    // console.log("repeatedExpenses", repeatedExpenses);

    // Balance Length

    const balanceLength = balance.length;

    // Assign starting date

    const forecastStartDate: String = dayjs(startDate).format("MM/DD/YYYY");
    const startDateDayjs = dayjs(startDate);

    let forecastList: ForecastEntry[] = [];

    for (let i = 0; i < length; i++) {
      let newDate = startDateDayjs.add(i + 1, "day").format("MM/DD/YYYY");
      let newBalance = balance[balanceLength - 1].balance;

      if (i === 0) {
        const forecastedBalance = createBalanceForecast(
          newBalance,
          repeatedIncome,
          repeatedExpenses,
          forecastStartDate
        );
        const forecastEntry = {
          date: startDateDayjs.format("MM/DD/YYYY"),
          balance: forecastedBalance,
          incomes: [incomePlaceholder],
          expenses: [expensesPlaceholder],
        };
        forecastList = [forecastEntry];
      }
      const forecastedBalance = createBalanceForecast(
        forecastList[i].balance,
        repeatedIncome,
        repeatedExpenses,
        newDate
      );

      const forecastEntry = {
        date: newDate,
        balance: forecastedBalance,
        incomes: [incomePlaceholder],
        expenses: [expensesPlaceholder],
      };
      forecastList.push(forecastEntry);
    }
    if (forecastList.length > 2) {
      setForecastList(forecastList);
    }

    function createBalanceForecast(balance: Number, incomes, expenses, date) {
      let dateIncomes = incomes.filter((element) => {
        if (
          dayjs(element.date).format("YYYYMMDD") ===
          dayjs(date).format("YYYYMMDD")
        ) {
          return element;
        }
      });
      const incomeTotal = dateIncomes.reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);

      let dateExpenses = expenses.filter((element) => {
        if (
          dayjs(element.date).format("YYYYMMDD") ===
          dayjs(date).format("YYYYMMDD")
        ) {
          return element;
        }
      });
      const expenseTotal = dateExpenses.reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);

      let newBalance = balance + incomeTotal - expenseTotal;
      let newDate = date;
      let incomeForThisDay = dateIncomes;
      let expensesForThisDay = dateExpenses;

      return {
        balance: newBalance,
        date: newDate,
        income: incomeForThisDay,
        expenses: expensesForThisDay,
      };
    }

    return forecastList;
  }
  return forecastBudget;
}


export const RepeatedDefaults = [
  "None",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Yearly",
];
