export interface ExpenseAddHook extends ExpenseAdd {
  supabaseClient: any;
}
export interface ExpenseAdd {
  user: string;
  name: string;
  amount: number;
  repeated: string;
  date: string;
}

export interface ExpenseUpdateObject {
  id: string;
  column: string;
  value: string;
  supabaseClient: any;
}

export interface ExpenseUpdateHook {
  id: string;
  column: string;
  value: string;
}

export interface ExpensePayload {
  commit_timestamp: string;
  errors: null | string[];
  eventType: "UPDATE" | "INSERT" | "DELETE";
  new: ExpenseEntry;
  old: OldExpenseEntry;
  schema: "public";
  table: "Expenses";
}

export interface ExpenseEntry {
  amount: number;
  created_at: string;
  date: string;
  id: number;
  name: string;
  repeated: "none" | "weekly" | "biweekly" | "monthly" | "yearly";
  user: string;
  uuid: string;
}

export interface OldExpenseEntry {
  uuid: string;
}
