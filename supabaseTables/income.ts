import { IncomeUpdateObject } from "@budget/types";
export async function addIncome({
  user,
  name,
  amount,
  repeated,
  date,
  supabaseClient,
}: {
  user: any;
  name: string;
  amount: string;
  repeated: string;
  date: string;
  supabaseClient: any;
}) {
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

export async function getIncomes(user: any, supabaseClient: any) {
  const { data, error } = await supabaseClient
    .from("Income")
    .select("*")
    .eq("user", user);

  return { data, error };
}

export async function deleteIncome(id: any, supabaseClient: any) {
  let { data, error } = await supabaseClient
    .from("Income")
    .delete()
    .eq("uuid", id);
  return { data, error };
}

export async function updateIncome({
  id,
  column,
  value,
  supabaseClient,
}: IncomeUpdateObject) {
  const { data, error } = await supabaseClient
    .from("Income")
    .update({ [column]: `${value}` })
    .eq("uuid", id);
  return { data, error };
}
