"use client"

import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: string
  devices: string[]
  licenses: string[]
  status: 'active' | 'inactive'
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Max Mustermann', email: 'max@example.com', role: 'Sales', devices: ['MBP-001', 'iPhone-001'], licenses: ['M365 E3', 'Slack Pro'], status: 'active' },
  { id: '2', name: 'Erika Musterfrau', email: 'erika@example.com', role: 'Dev', devices: ['WIN-014'], licenses: ['GitHub Pro', 'Slack Pro'], status: 'active' },
  { id: '3', name: 'Sven Schmidt', email: 'sven@example.com', role: 'Ops', devices: ['LIN-103', 'MBP-002'], licenses: ['M365 E3', 'Okta'], status: 'inactive' },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Sales' })

  const addUser = () => {
    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      devices: [],
      licenses: [],
      status: 'active'
    }
    setUsers([...users, newUser])
    setFormData({ name: '', email: '', role: 'Sales' })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[color:var(--text)] tracking-tight">Benutzer</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Benutzer hinzufügen
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 text-[color:var(--text)]">Neuer Benutzer</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted">Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label className="text-sm text-muted">E-Mail</label>
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="max@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Rolle</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
              >
                <option value="Sales">Sales</option>
                <option value="Dev">Dev</option>
                <option value="Ops">Ops</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={addUser} className="btn btn-primary">
              Hinzufügen
            </button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline">
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div className="card p-6">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">E-Mail</th>
              <th className="th">Rolle</th>
              <th className="th">Geräte</th>
              <th className="th">Lizenzen</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="td font-medium">{user.name}</td>
                <td className="td">{user.email}</td>
                <td className="td">
                  <span className="badge badge-ok">{user.role}</span>
                </td>
                <td className="td">
                  <div className="flex flex-wrap gap-1">
                    {user.devices.map(device => (
                      <span key={device} className="badge badge-warn text-xs">{device}</span>
                    ))}
                    {user.devices.length === 0 && <span className="text-muted text-sm">Keine</span>}
                  </div>
                </td>
                <td className="td">
                  <div className="flex flex-wrap gap-1">
                    {user.licenses.map(license => (
                      <span key={license} className="badge badge-ok text-xs">{license}</span>
                    ))}
                    {user.licenses.length === 0 && <span className="text-muted text-sm">Keine</span>}
                  </div>
                </td>
                <td className="td">
                  <span className={`badge ${user.status === 'active' ? 'badge-ok' : 'badge-err'}`}>
                    {user.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
