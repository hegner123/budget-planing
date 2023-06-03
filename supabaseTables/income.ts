import { IncomeUpdateObject, IncomeAddHook } from "@budget/types";
export async function addIncome({
  user,
  name,
  income,
  repeated,
  date,
  supabaseClient,
}: IncomeAddHook) {
  if (!name) throw new Error("No name provided");
  if (!income) throw new Error("No amount provided");

  const { data, error } = await supabaseClient.from("Income").insert([
    {
      user: `${user}`,
      name: `${name}`,
      income: `${income}`,
      repeated: repeated,
      date: `${date}`,
    },
  ]);

  return { data, error };
}

export async function getIncomes({
  user,
  supabaseClient,
}: {
  user: string;
  supabaseClient: any;
}) {
  const { data, error } = await supabaseClient
    .from("Income")
    .select("*")
    .eq("user", user);

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
