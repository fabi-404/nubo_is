export type AuditEvent = {
  id: string
  timestamp: string
  actor: string
  action: string
  target?: string
  meta?: Record<string, unknown>
  status?: 'ok' | 'error'
}

// Simple in-memory audit store (module singleton)
const events: AuditEvent[] = []

export function writeAudit(event: Omit<AuditEvent, 'id' | 'timestamp'>) {
  const e: AuditEvent = {
    id: Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
    ...event,
  }
  events.unshift(e)
  return e
}

export function getAudit(limit = 100) {
  return events.slice(0, limit)
}

