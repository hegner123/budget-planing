import { ExpenseUpdateObject } from "@budget/types";

export async function deleteExpenses({
  id,
  supabaseClient,
}: {
  id: string;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Expenses")
    .delete()
    .eq("uuid", id);
  return { data, error };
}

export async function updateExpense({ newRow, supabaseClient }: any) {
  const { id, name, expenses, repeated, date } = newRow;

  let { data, error } = await supabaseClient
    .from("Expenses")
    .update({
      name: `${name}`,
      amount: `${parseFloat(expenses.slice(1))}`,
      repeated: `${repeated}`,
      date: `${date}`,
    })
    .eq("uuid", id);
  return { data, error };
}
