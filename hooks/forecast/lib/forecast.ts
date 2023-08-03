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

export function forecastBudget(
  length: number,
  startDate: string,
  stringData: any
) {
  console.log("length", length);
  console.log("startDate", startDate);
  console.log("stringData", stringData);
  let data: BudgetEntry[] = JSON.parse(stringData);
  console.log("data", data);

  const rawBalance: BudgetEntry[] = data.filter(
    (entry: BudgetEntry) => entry.type === "balance"
  );
  console.log("rawBalance", rawBalance);
  const balanceLength = rawBalance.length;
  console.log("balanceLength", balanceLength);

  const rawIncome: BudgetEntry[] = data.filter(
    (entry: BudgetEntry) => entry.type === "income"
  );
  console.log("rawIncome", rawIncome);
  const rawExpenses: BudgetEntry[] = data.filter(
    (entry: BudgetEntry) => entry.type === "expenses"
  );
  console.log("rawExpenses", rawExpenses);

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
      forecastList[i]?.balance || (newBalance as number),
      repeatedIncome as BudgetEntryRepeats[],
      repeatedExpenses as BudgetEntryRepeats[],
      newDate as string,
      i as number,
      newBalance as number
    );

    forecastList.push(forecastedBalance);
  }
  console.log("forecastList", JSON.stringify(forecastList));

  return forecastList;
}
