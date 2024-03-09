import { AuthLogin } from "@budget/types/auth";

async function loginUser({ email, password, supabaseClient }: AuthLogin) {
    if (!email) throw new Error("No email provided");
    if (!password) throw new Error("No password provided");
    if (!supabaseClient) throw new Error("No supabaseClient provided");
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: `${email}`,
            password: `${password}`,
        });

        // Store data in local storage
        if (data) {
            localStorage.setItem("token", JSON.stringify(data));
        }

        return { data, error };
    } catch (error) {
        if (error) throw new Error(JSON.stringify(error));
    }
}

export { loginUser };
