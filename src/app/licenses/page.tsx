"use client"

import { useState } from 'react'

type License = {
  provider: string
  product: string
  seats: number
  used: number
  renews: string
  costPerSeat: number
}

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([
    { provider: 'Microsoft', product: 'Microsoft 365 E3', seats: 45, used: 42, renews: '2025-01-15', costPerSeat: 28 },
    { provider: 'Adobe', product: 'Creative Cloud', seats: 10, used: 9, renews: '2024-12-01', costPerSeat: 60 },
    { provider: 'Slack', product: 'Slack Pro', seats: 30, used: 22, renews: '2025-03-30', costPerSeat: 8 },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ provider: '', product: '', seats: 1, renews: '', costPerSeat: 0 })

  const addLicense = () => {
    const newLicense: License = {
      provider: formData.provider,
      product: formData.product,
      seats: formData.seats,
      used: 0,
      renews: formData.renews,
      costPerSeat: formData.costPerSeat
    }
    setLicenses([...licenses, newLicense])
    setFormData({ provider: '', product: '', seats: 1, renews: '', costPerSeat: 0 })
    setShowForm(false)
  }

  const grouped = licenses.reduce((acc: Record<string, typeof licenses>, l) => {
    (acc[l.provider] ||= [] as any).push(l)
    return acc
  }, {} as Record<string, typeof licenses>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[color:var(--text)] tracking-tight">Lizenzen</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Lizenz hinzufügen
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 text-[color:var(--text)]">Neue Lizenz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted">Provider</label>
              <input
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="Microsoft"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Produkt</label>
              <input
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="Microsoft 365 E3"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Anzahl Plätze</label>
              <input
                type="number"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || 1 })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                min="1"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Erneuerung (YYYY-MM-DD)</label>
              <input
                type="date"
                value={formData.renews}
                onChange={(e) => setFormData({ ...formData, renews: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <label className="text-sm text-muted">Kosten pro Platz (€)</label>
              <input
                type="number"
                value={formData.costPerSeat}
                onChange={(e) => setFormData({ ...formData, costPerSeat: parseFloat(e.target.value) || 0 })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={addLicense} className="btn btn-primary">
              Hinzufügen
            </button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline">
              Abbrechen
            </button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {Object.entries(grouped).map(([provider, rows]) => (
          <div key={provider} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[color:var(--text)]">{provider}</h2>
              <span className="text-xs text-gray-500">Gesamtkosten/Monat: €{rows.reduce((s, r) => s + r.costPerSeat * r.seats, 0)}</span>
            </div>
            <table className="table">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="th">Produkt</th>
                  <th className="th">Plätze</th>
                  <th className="th">Belegt</th>
                  <th className="th">Auslastung</th>
                  <th className="th">Erneuerung</th>
                  <th className="th">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(l => {
                  const utilization = Math.round((l.used / l.seats) * 100)
                  const dormant = utilization < 70
                  return (
                    <tr key={l.product}>
                      <td className="td">{l.product}</td>
                      <td className="td">{l.seats}</td>
                      <td className="td">{l.used}</td>
                      <td className="td">{utilization}%</td>
                      <td className="td">{new Date(l.renews).toLocaleDateString()}</td>
                      <td className="td">
                        {dormant ? (
                          <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: 12 }} onClick={async () => {
                            await fetch('/api/audit', { method: 'POST', body: JSON.stringify({ actor: 'admin', action: 'reclaim_licenses', target: l.product }) })
                            alert('Reclaim-Vorschlag protokolliert (Demo)')
                          }}>Reclaim</button>
                        ) : (
                          <span className="badge badge-ok">OK</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}


