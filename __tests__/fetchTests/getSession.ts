import { describe, expect, test } from "@jest/globals";
import useSession from "@budget/hooks/auth/useSession";

const expectedSession = {
    session: {
        expires_at: 1709134516,
        expires_in: 2641,
        token_type: "bearer",
        access_token:
            "********************************************************",
        refresh_token: "*******************",
        provider_token: null,
        provider_refresh_token: null,
        user: {
            id: "e672b47c-62e9-4392-b033-34d8f1da4698",
            factors: null,
            aud: "authenticated",
            iat: 1709130916,
            iss: "https://ukbhnbmumzaorpsnhjoa.supabase.co/auth/v1",
            email: "hegner123+test2@gmail.com",
            phone: "",
            app_metadata: {
                provider: "email",
                providers: ["email"],
            },
            user_metadata: {},
            role: "authenticated",
            aal: "aal1",
            amr: [
                {
                    method: "password",
                    timestamp: 1709065141,
                },
            ],
            session_id: "57da4e9b-8abf-49fa-82bb-a17abebeb59e",
        },
    },
};

describe("useSession test", () => {
  test("the data is peanut butter", () => {
    const { getSession } = useSession();
    return getSession().then((data) => {
      expect(data).toHaveProperty("session");
      expect(data).toHaveProperty("session.expires_at");
      expect(data).toHaveProperty("expires_in");
      expect(data).toHaveProperty("token_type");
      expect(data).toHaveProperty("access_token");
      expect(data).toHaveProperty("refresh_token");
      expect(data).toHaveProperty("provider_token");
      expect(data).toHaveProperty("provider_refresh_token");
      expect(data).toHaveProperty("user");
      expect(data).toHaveProperty("user.id");
      expect(data).toHaveProperty("user.factors");
      expect(data).toHaveProperty("user.aud");
      expect(data).toHaveProperty("user.iat");
      expect(data).toHaveProperty("user.iss");
      expect(data).toHaveProperty("user.email");
      expect(data).toHaveProperty("user.phone");
      expect(data).toHaveProperty("user.app_metadata");
      expect(data).toHaveProperty("user.provider");
      expect(data).toHaveProperty("user.providers");
      expect(data).toHaveProperty("user.user_metadata");
      expect(data).toHaveProperty("user.role");
      expect(data).toHaveProperty("user.aal");
      expect(data).toHaveProperty("user.amr");
      expect(data).toHaveProperty("user.session_id");
    });
  });
});
