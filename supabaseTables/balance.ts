export async function addBalance(name: string, amount: string, user: string) {}
export async function getBalance(supabaseClient: any) {
  let { data, error } = await supabaseClient.from("Balance").select("*");

  return { data, error };
}
