export default function Home() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-secondary tracking-tight">Übersicht</h1>
          <p className="text-sm text-gray-600">nubo is your smart IT autopilot</p>
        </div>
        <button className="btn btn-primary">
          Neue Aufgabe
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-xs text-muted">Onboarding Pipeline</div>
          <div className="text-3xl font-semibold text-[color:var(--text)]">4</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-muted">License Utilization</div>
          <div className="text-3xl font-semibold text-[color:var(--text)]">84%</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-muted">Security Score</div>
          <div className="text-3xl font-semibold text-[color:var(--text)]">92</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="text-sm font-semibold mb-3 text-[color:var(--text)]">Onboarding Aufgaben</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Azure AD Konto anlegen</span>
              <span className="badge badge-ok">Automatisiert</span>
            </li>
            <li className="flex items-center justify-between">
              <span>MacBook zuweisen</span>
              <span className="badge badge-warn">Manuell</span>
            </li>
            <li className="flex items-center justify-between">
              <span>MS 365 Lizenz vergeben</span>
              <span className="badge badge-ok">Automatisiert</span>
            </li>
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="text-sm font-semibold mb-3 text-[color:var(--text)]">Geräte Status</h2>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-3 rounded bg-white enterprise-shadow">
              <div className="text-xs text-gray-500">Online</div>
              <div className="text-2xl font-semibold">82</div>
            </div>
            <div className="p-3 rounded bg-white enterprise-shadow">
              <div className="text-xs text-gray-500">Offline</div>
              <div className="text-2xl font-semibold">5</div>
            </div>
            <div className="p-3 rounded bg-white enterprise-shadow">
              <div className="text-xs text-gray-500">Warnungen</div>
              <div className="text-2xl font-semibold">2</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
