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
import processExpenses from "./processExpenses";
import processIncome from "./processIncome";
import dayjs from "dayjs";

export function forecastBudget(
  length: number,
  startDate: string,
  stringData: string,
  customBalance?: number
) {
  let userBudgetData: BudgetEntry[] = JSON.parse(stringData);

  const extractedBalances: BudgetEntry[] = userBudgetData.filter(
    (entry: BudgetEntry) => entry.type === "balance"
  );
  let customExtractedBalances: BudgetEntry[] = [];

  if (customBalance) {
    // customExtractedBalances[0] = ExtractedBalances[0];
    customExtractedBalances[0].amount = customBalance;
  }

  const balanceLength = extractedBalances.length;

  const repeatedExpenses: BudgetEntryRepeats[] = processExpenses(
    userBudgetData,
    length
  );

  const repeatedIncome: BudgetEntryRepeats[] = processIncome(
    userBudgetData,
    length
  );

  const forecastStartDate: String = dayjs(startDate).format("MM/DD/YYYY");
  const startDateDayjs = dayjs(startDate);

  let forecastList: ForecastEntry[] = [];

  forecastList.push(
    createBalance(
      extractedBalances[balanceLength - 1].amount,
      repeatedIncome as BudgetEntryRepeats[],
      repeatedExpenses as BudgetEntryRepeats[],
      forecastStartDate as string
    )
  );

  for (let i: number = 0; i < length; i++) {
    let newDate: string = startDateDayjs.add(i + 1, "day").format("MM/DD/YYYY");
    let newBalance: number = extractedBalances[balanceLength - 1].amount;

    const forecastedBalance: ForecastEntry = createBalance(
      Number(forecastList[i]?.balance),
      repeatedIncome as BudgetEntryRepeats[],
      repeatedExpenses as BudgetEntryRepeats[],
      newDate as string
    );

    forecastList = [...forecastList, forecastedBalance];
  }
  return forecastList;
}
