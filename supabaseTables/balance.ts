export async function addBalance(name: string, amount: string, user: string) {}
export async function getBalance(supabaseClient: any, user: string) {
  let { data, error } = await supabaseClient
    .from("Balance")
    .select("*")
    .eq("user", user);

  return { data, error };
}
