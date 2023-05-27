export async function addExpenses({
  user,
  name,
  amount,
  repeated,
  repeated_date,
  supabaseClient,
}: {
  user: string;
  name: string;
  amount: number;
  repeated: string;
  repeated_date: string;
  supabaseClient: any;
}) {
  if (!user) throw new Error("No user provided");
  if (!name) throw new Error("No name provided");
  if (!amount) throw new Error("No amount provided");

  let repeated_date_formatted = repeated_date ? `${repeated_date}` : null;

  const { data, error } = await supabaseClient.from("Expenses").insert([
    {
      user: `${user}`,
      name: `${name}`,
      amount: `${amount}`,
      repeated: repeated,
      date: repeated_date_formatted,
    },
  ]);

  return { data, error };
}
export async function getExpenses(user: any, supabaseClient: any) {
  let { data, error } = await supabaseClient
    .from("Expenses")
    .select("*")
    .eq("user", user);
  return { data, error };
}

export async function deleteExpenses(id: any, supabaseClient: any) {
  let { data, error } = await supabaseClient
    .from("Expenses")
    .delete()
    .eq("id", id);
  return { data, error };
}
