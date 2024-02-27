import { BudgetEntry, BudgetEntryRepeats } from "@budget/types";
import { refreshDates } from "./refresh";
import { repeatedEntries } from "./repeats";

function processIncome(userBudgetData: BudgetEntry[], length: number) {
  const extractedIncomes: BudgetEntry[] = userBudgetData.filter(
    (entry: BudgetEntry) => entry.type === "income"
  );

  const refreshedIncome: BudgetEntry[] = refreshDates(
    extractedIncomes as BudgetEntry[]
  );

  const repeatedIncome: BudgetEntryRepeats[] = repeatedEntries(
    refreshedIncome as BudgetEntry[],
    length as number
  );

  return repeatedIncome;
}

export default processIncome;
