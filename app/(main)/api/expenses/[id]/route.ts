
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url"
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const url = parseUrl(request.url)
    const id = url.query?.id
    return new Response(JSON.stringify({ message: id }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    })

}
