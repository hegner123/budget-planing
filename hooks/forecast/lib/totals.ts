import { BudgetEntryRepeats } from "@budget/types";

export function calcTotal(entries: BudgetEntryRepeats[]): number {
  return entries.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
}
