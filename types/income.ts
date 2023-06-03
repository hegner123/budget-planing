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
