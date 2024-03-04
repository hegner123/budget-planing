import { BudgetEntry, BudgetEntryRepeats } from "@budget/types";
import { refreshDates } from "./refresh";
import { repeatedEntries } from "./repeats";

function processExpenses(userBudgetData: BudgetEntry[], length: number) {
  const extractedExpenses: BudgetEntry[] = userBudgetData.filter(
    (entry: BudgetEntry) => entry.type === "expenses"
  );

  const refreshedExpenses: BudgetEntry[] = refreshDates(
    extractedExpenses
  ) as BudgetEntry[];

  const repeatedExpenses: BudgetEntryRepeats[] = repeatedEntries(
    refreshedExpenses as BudgetEntry[],
    length as number
  );

  return repeatedExpenses;
}

export default processExpenses;
