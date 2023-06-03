export interface BalanceObject {
  data: {};
}

export interface BalanceUpdateObject {
  id: string;
  column: string;
  value: string;
  supabaseClient: any;
}