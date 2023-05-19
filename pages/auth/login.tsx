import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useLogin } from "@budget/hooks/auth/useLogin";

const LoginPage = () => {
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();

  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/dashboard/");
  }

  return (
    <main className="justify-center min-w-full mt-10 main-min-h site-width site_grid">
      <div className="w-full col-start-6 col-span-4">
        <form className="w-full p-10 bg-slate-600 grid grid-cols-2">
          <h4 className="text-4xl text-slate-900 col-span-2">Login</h4>
          {error && <p className="text-red-500 col-span-2">{error}</p>}
          <label className="w-full mt-5 cols-start-2 col-span-2 text-slate-900">
            Email:{" "}
          </label>
          <input
            className="w-full p-5 rounded cols-start-2 col-span-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <label className="w-full mt-5 cols-start-2 col-span-2 text-slate-900">
            Password:{" "}
          </label>
          <input
            className="w-full p-5 rounded cols-start-2 col-span-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <button
            className="p-2 mt-5 bg-white rounded text-slate-900"
            onClick={(e) => handleSubmit(e)}>
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
