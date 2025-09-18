"use client"

import { useState } from 'react'

const ROLE_TEMPLATES = {
  Sales: ["Google Group", "M365 E3", "Slack", "GitHub Sales", "Default Apps"],
  Dev: ["Google Group", "Slack", "GitHub Engineers", "Default Apps"],
  Ops: ["Google Group", "M365 E3", "Slack", "Okta group XYZ", "Default Apps"],
}

type Role = keyof typeof ROLE_TEMPLATES

export default function OnboardingPage() {
  const [role, setRole] = useState<Role>('Sales')
  const [selected, setSelected] = useState<string[]>(ROLE_TEMPLATES['Sales'])
  const [email, setEmail] = useState('new.hire@example.com')
  const [submitting, setSubmitting] = useState(false)

  const toggle = (res: string) => {
    setSelected((cur) => cur.includes(res) ? cur.filter(r => r !== res) : [...cur, res])
  }

  const applyRole = (r: Role) => {
    setRole(r)
    setSelected(ROLE_TEMPLATES[r])
  }

  const provision = async () => {
    setSubmitting(true)
    const steps = [
      { action: 'create_identity', target: email },
      { action: 'assign_groups_licenses', meta: { role, resources: selected } },
      { action: 'send_pre_enrollment', target: email },
    ]
    for (const s of steps) {
      await fetch('/api/audit', { method: 'POST', body: JSON.stringify({ actor: 'admin', status: 'ok', ...s }) })
      await new Promise(r => setTimeout(r, 300))
    }
    setSubmitting(false)
    alert('Provisionierung angestoßen (Demo). Audit-Log wurde geschrieben.')
  }

  const resources = Array.from(new Set(Object.values(ROLE_TEMPLATES).flat()))

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-[color:var(--text)] tracking-tight">Onboarding</h1>

      <div className="card p-4 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500">Rolle</label>
            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
              {(Object.keys(ROLE_TEMPLATES) as Role[]).map(r => (
                <button key={r} onClick={() => applyRole(r)} className={`btn ${role === r ? 'btn-primary' : 'btn-outline'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">E-Mail neuer Mitarbeiter</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full border rounded px-3 py-2 text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
          <div className="flex items-end">
            <button onClick={provision} disabled={submitting} className="btn btn-primary">
              {submitting ? 'Provisioniere…' : 'Provisionieren'}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">Ressourcen</label>
          <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {resources.map(r => (
              <label key={r} className="flex items-center gap-2 bg-white border rounded px-3 py-2 text-sm" style={{ borderColor: 'var(--border)' }}>
                <input type="checkbox" checked={selected.includes(r)} onChange={() => toggle(r)} />
                {r}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


