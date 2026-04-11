export const dynamic = 'force-static'

export async function POST() {
  return new Response(
    JSON.stringify({ success: false, message: 'API not available in static mode' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}