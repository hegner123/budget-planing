import { IncomeUpdateObject, IncomeAddHook } from "@budget/types";
import { useQuery } from '@tanstack/react-query'
export async function addIncomeSupabase({
  user,
  name,
  amount,
  repeated,
  date,
  supabaseClient,
}: IncomeAddHook) {
  if (!name) throw new Error("No name provided");
  if (!amount) throw new Error("No amount provided");

  const { data, error } = await supabaseClient.from("Income").insert([
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



export async function deleteIncome({
  id,
  supabaseClient,
}: {
  id: string;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Income")
    .delete()
    .eq("uuid", id);
  return { data, error };
}

export async function updateIncome({ newRow, supabaseClient }: any) {
  const { id, name, amount, repeated, date } = newRow;
  console.log(amount);
  const { data, error } = await supabaseClient
    .from("Income")
    .update({
      name: `${name}`,
      amount: `${parseFloat(amount)}`,
      repeated: `${repeated}`,
      date: `${date}`,
    })
    .eq("uuid", id);
  return { data, error };
}
