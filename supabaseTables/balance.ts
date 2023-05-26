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
