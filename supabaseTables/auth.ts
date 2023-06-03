import { AuthLogin } from "@budget/types/auth";

async function loginUser({ email, password, supabaseClient }: AuthLogin) {
  if (!email) throw new Error("No email provided");
  if (!password) throw new Error("No password provided");
  if (!supabaseClient) throw new Error("No supabaseClient provided");
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: `${email}`,
    password: `${password}`,
  });
  if (error) {
    return { error: error.message };
  }

  return data;
}

export { loginUser };
