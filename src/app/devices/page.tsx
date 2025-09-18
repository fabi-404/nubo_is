"use client"

import { useState } from 'react'

type Device = {
  id: string
  user: string
  status: 'online' | 'offline' | 'amber'
  type: string
  model: string
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: 'MBP-001', user: 'Max', status: 'online', type: 'Laptop', model: 'MacBook Pro' },
    { id: 'WIN-014', user: 'Erika', status: 'offline', type: 'Desktop', model: 'Dell OptiPlex' },
    { id: 'LIN-103', user: 'Sven', status: 'amber', type: 'Laptop', model: 'ThinkPad X1' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ id: '', user: '', type: 'Laptop', model: '' })

  const addDevice = () => {
    const newDevice: Device = {
      id: formData.id,
      user: formData.user,
      status: 'online',
      type: formData.type,
      model: formData.model
    }
    setDevices([...devices, newDevice])
    setFormData({ id: '', user: '', type: 'Laptop', model: '' })
    setShowForm(false)
  }

  const statusClass = (s: string) =>
    s === 'online' ? 'bg-green-100 text-green-800' : s === 'offline' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[color:var(--text)] tracking-tight">Geräte</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Gerät hinzufügen
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 text-[color:var(--text)]">Neues Gerät</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted">Geräte-ID</label>
              <input
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="MBP-002"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Benutzer</label>
              <input
                value={formData.user}
                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label className="text-sm text-muted">Typ</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
              >
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Tablet">Tablet</option>
                <option value="Smartphone">Smartphone</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted">Modell</label>
              <input
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: 'var(--border)' }}
                placeholder="MacBook Pro M3"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={addDevice} className="btn btn-primary">
              Hinzufügen
            </button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline">
              Abbrechen
            </button>
          </div>
        </div>
      )}
      <div className="card p-4">
        <table className="table">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="th">Geräte-ID</th>
              <th className="th">Benutzer</th>
              <th className="th">Typ</th>
              <th className="th">Modell</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(d => (
              <tr key={d.id}>
                <td className="td font-medium">{d.id}</td>
                <td className="td">{d.user}</td>
                <td className="td">{d.type}</td>
                <td className="td">{d.model}</td>
                <td className="td"><span className={`badge ${statusClass(d.status)}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


