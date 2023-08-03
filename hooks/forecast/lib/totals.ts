import { BudgetEntryRepeats } from "@budget/types";
// Expects Entries to be filtered by date before being passed in
export function calcTotals(entries: BudgetEntryRepeats[]): number {
  let total = 0;
  entries.forEach((entry) => {
    total += entry.amount;
  });
  return total;
}


