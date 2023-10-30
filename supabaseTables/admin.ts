export async function deleteUserData(userId: string, supabaseClient: any) {
  try {
    // delete balance entries
    deleteUserBalance({ id: userId, supabaseClient });
    // delete income entries
    deleteUserIncome({ id: userId, supabaseClient });
    // delete expense entries
    deleteUserExpenses({ id: userId, supabaseClient });
  } catch (error) {
    console.error(error);
    return { error };
  }
}

async function deleteUserBalance({
  id,
  supabaseClient,
}: {
  id: string;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Balance")
    .delete()
    .eq("user", id);
  return { data, error };
}

async function deleteUserExpenses({
  id,
  supabaseClient,
}: {
  id: string;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Expenses")
    .delete()
    .eq("user", id);
  return { data, error };
}

async function deleteUserIncome({
  id,
  supabaseClient,
}: {
  id: string;
  supabaseClient: any;
}) {
  let { data, error } = await supabaseClient
    .from("Income")
    .delete()
    .eq("user", id);
  return { data, error };
}
