import { BalanceUpdateObject } from "@budget/types";

export async function addBalance({
  name,
  amount,
  user,
  date,
  supabaseClient,
}: {
  name: string;
  amount: number;
  user: string;
  date: string;
  supabaseClient: any;
}) {
  if (!user) return console.log("No user");
  const { data, error } = await supabaseClient
    .from("Balance")
    .insert([{ name: name, amount: amount, date: date, user: user }]);
  return { data, error };
}
export async function getBalance(user: string, supabaseClient: any) {
  let { data, error } = await supabaseClient
    .from("Balance")
    .select("*")
    .eq("user", user);

  return { data, error };
}

export async function deleteBalance(id: string, supabaseClient: any) {
  let { data, error } = await supabaseClient
    .from("Balance")
    .delete()
    .eq("uuid", id);
  return { data, error };
}

export async function updateBalance({ newRow, supabaseClient }) {
  const { id, name, balance, repeated, date } = newRow;
  const { data, error } = await supabaseClient
    .from("Balance")
    .update({
      name: `${name}`,
      amount: `${parseFloat(balance.slice(1))}`,
      repeated: `${repeated}`,
      date: `${date}`,
    })
    .eq("uuid", id);
  return { data, error };
}