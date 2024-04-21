
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

export async function deleteBalance(id: string, supabaseClient: any) {
  let { data, error } = await supabaseClient
    .from("Balance")
    .delete()
    .eq("uuid", id);
  return { data, error };
}

export async function updateBalance({ newRow, supabaseClient }) {
  const { id, name, amount, date } = newRow;
  console.log(newRow);
  const { data, error } = await supabaseClient
    .from("Balance")
    .update({
      uuid: id,
      name: `${name}`,
      amount: amount,
      date: `${date}`,
    })
    .eq("uuid", id);
  if (data === null && error === null) {
    return { newRow, error };
  }
  return { data, error };
}
