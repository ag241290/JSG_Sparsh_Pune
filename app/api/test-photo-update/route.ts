export async function GET() {
  return new Response(JSON.stringify({
    message: 'Test endpoint removed - all issues resolved',
    status: 'removed'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  })
}