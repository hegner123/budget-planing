// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { userID } = await req.json();
    const authHeader = req.headers.get("Authorization")!;
    const adminSecret = Deno.env.get("ADMIN_ROLE");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: { headers: { Authorization: authHeader } },
      }
    );
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      adminSecret,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }
    );
    const { userData, userError } = await supabaseClient.auth.getUser(userID);

    const { data, error } = await adminClient.auth.admin.deleteUser(userID);

    // const user = data.user;

    return new Response(
      JSON.stringify({ userID, userData, userError, data, error }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
  //   return new Response(JSON.stringify(data), {
  //     headers: { "Content-Type": "application/json" },
  //   });
});
