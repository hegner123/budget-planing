import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = () =>{
   const client: SupabaseClient = createClientComponentClient()
return client
    
}

export default supabase
