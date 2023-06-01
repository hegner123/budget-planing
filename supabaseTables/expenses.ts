export async function addExpenses({
  user,
  name,
  amount,
  repeated,
  date,
  supabaseClient,
}: {
  user: string;
  name: string;
  amount: number;
  repeated: string;
  date: string;
  supabaseClient: any;
}) {
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
  user: any;
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
  id: any;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Expenses")
    .delete()
    .eq("uuid", id);
  return { data, error };
}
