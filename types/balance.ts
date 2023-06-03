export interface BalanceAddHook extends BalanceAdd {
  supabaseClient: any;
}
export interface BalanceAdd {
  user: string;
  name: string;
  amount: number;
  date: string;
}

export interface BalanceUpdateObject {
  id: string;
  column: string;
  value: string;
  supabaseClient: any;
}

export interface BalanceUpdateHook {
  id: string;
  column: string;
  value: string;
}

export interface BalancePayload {
  commit_timestamp: string;
  errors: null | string[];
  eventType: "UPDATE" | "INSERT" | "DELETE";
  new: BalanceEntry;
  old: OldBalanceEntry;
  schema: "public";
  table: "Balances";
}

export interface BalanceEntry {
  amount: number;
  created_at: string;
  date: string;
  id: number;
  name: string;
  user: string;
  uuid: string;
}

export interface OldBalanceEntry {
  uuid: string;
}
