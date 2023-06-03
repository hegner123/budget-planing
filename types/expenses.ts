export interface ExpenseObject {
  data: {};
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