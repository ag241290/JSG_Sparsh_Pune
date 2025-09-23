import { NextResponse } from 'next/server'

export async function GET() {
  return new Response(JSON.stringify({
    message: 'Health endpoint removed - troubleshooting completed',
    status: 'removed'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  })
}