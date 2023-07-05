export interface IncomeAdd {
  user: string;
  name: string;
  income: number;
  repeated: string;
  date: string;
}

export interface IncomeAddHook extends IncomeAdd {
  supabaseClient: any;
}
export interface IncomeUpdateObject {
  id: string;
  column: string;
  value: string;
  supabaseClient: any;
}

export interface IncomeUpdateHook {
  id: string;
  column: string;
  value: string;
}

export interface IncomePayload {
  commit_timestamp: string;
  errors: null | string[];
  eventType: "UPDATE" | "INSERT" | "DELETE";
  new: IncomeEntry;
  old: OldIncomeEntry;
  schema: "public";
  table: "Income";
}

export interface IncomeEntry {
  amount: number;
  created_at: string;
  date: string;
  id: number;
  name: string;
  repeated: "none" | "weekly" | "biweekly" | "monthly" | "yearly";
  user: string;
  uuid: string;
}

export interface OldIncomeEntry {
  uuid: string;
}
