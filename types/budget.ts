export interface BudgetEntry {
  id: string;
  name: string;
  amount: number;
  date: string;
  repeated: string;
  type: string;
}

export interface BudgetEntryRepeats extends BudgetEntry {
  repeats: string[];
}
