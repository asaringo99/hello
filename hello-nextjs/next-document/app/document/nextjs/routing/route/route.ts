import { NextRequest } from "next/server"

export function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const query = searchParams.get('query')
	console.log(query)
	const data = {
		"dat": query ? `sample_${query}` : "sample"
	}

	return Response.json({ data })
}