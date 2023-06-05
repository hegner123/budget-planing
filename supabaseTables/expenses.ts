import { ExpenseUpdateObject, ExpenseAddHook } from "@budget/types";

export async function addExpenses({
  user,
  name,
  amount,
  repeated,
  date,
  supabaseClient,
}: ExpenseAddHook) {
  if (!user) throw new Error("No user provided");
  if (!name) throw new Error("No name provided");
  if (!amount) throw new Error("No amount provided");

  const { data, error } = await supabaseClient.from("Expenses").insert([
    {
      user: `${user}`,
      name: `${name}`,
      amount: `${amount}`,
      repeated: repeated,
      date: `${date}`,
    },
  ]);

  return { data, error };
}

export async function getExpenses({
  user,
  supabaseClient,
}: {
  user: string;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Expenses")
    .select("*")
    .eq("user", user);
  return { data, error };
}

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
