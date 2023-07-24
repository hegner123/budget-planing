import { BudgetEntryRepeats } from "@budget/types";

export function dateFilter(
  budgetEntries: BudgetEntryRepeats[],
  date
): BudgetEntryRepeats[] {
  return budgetEntries.filter((entry) => {
    if (entry.repeats.includes(date)) {
      return entry;
    }
  });
}
