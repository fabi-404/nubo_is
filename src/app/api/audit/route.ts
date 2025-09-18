import { NextResponse } from 'next/server'
import { getAudit, writeAudit } from '@/lib/audit'

export async function GET() {
  return NextResponse.json({ events: getAudit() })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const ev = writeAudit({
    actor: body.actor || 'system',
    action: body.action || 'unknown',
    target: body.target,
    meta: body.meta,
    status: body.status || 'ok',
  })
  return NextResponse.json({ event: ev })
}


