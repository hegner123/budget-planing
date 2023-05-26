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
  amount: string;
  repeated: string;
  repeated_date: string;
  supabaseClient: any;
}) {
  if (!user) throw new Error("No user provided");
  if (!name) throw new Error("No amount provided");
  if (!amount) throw new Error("No date provided");
  if (!repeated) throw new Error("No date provided");
  if (!repeated_date) throw new Error("No recurrence provided");
  const { data, error } = await supabaseClient.from("expense").insert([
    {
      user: `${user}`,
      name: `${name}`,
      amount: `${amount}`,
      repeated: repeated,
      repeated_date: `${repeated_date}`,
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
