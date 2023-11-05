import {
  BudgetEntry,
  BudgetEntryRepeats,
  ExpenseEntry,
  ForecastEntry,
  IncomeEntry,
} from "@budget/types";
import { refreshDates } from "./refresh";
import { repeatedEntries } from "./repeats";
import { createBalance } from "./createBalance";
import dayjs from "dayjs";

export function forecastBudget(length: number, startDate: string, stringData: any) {
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
    let newDate: string = startDateDayjs.add(i + 1, "day").format("MM/DD/YYYY");
    let newBalance: number = rawBalance[balanceLength - 1].amount;

    const forecastedBalance: ForecastEntry = createBalance(
      Number(forecastList[i - 1]?.balance) || (newBalance as number),
      repeatedIncome as BudgetEntryRepeats[],
      repeatedExpenses as BudgetEntryRepeats[],
      newDate as string,
      i as number,
      newBalance as number
    );

    forecastList.push(forecastedBalance);
  }
  return forecastList;
}
