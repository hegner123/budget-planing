import { getBalance } from "@budget/supabaseTables"
import { createClient } from "@supabase/supabase-js"
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export async function GET(request: Request) {
    const url = parseUrl(request.url)
    const id = url.pathname.split("/")
  const { data, error } = await supabase
    .from('Balance')
    .select('*');

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({
        url: url,
        id: id[id.length - 1],
        message: data,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    })

}
