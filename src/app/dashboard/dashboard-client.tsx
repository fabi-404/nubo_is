'use client'

import { startOnboardingFlow } from '@/app/actions'
import { useState } from 'react'

interface Flow {
  id: string
  employee_email: string
  status: string
  created_at: string
}

interface DashboardClientProps {
  flows: Flow[]
}

export default function DashboardClient({ flows: initialFlows }: DashboardClientProps) {
  const [flows, setFlows] = useState(initialFlows)
  const [loading, setLoading] = useState(false)

  const handleStartFlow = async () => {
    setLoading(true)
    const result = await startOnboardingFlow()
    
    if (result.success && result.flow) {
      setFlows([result.flow, ...flows])
    } else {
      alert(result.error || 'Failed to start flow')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {flows.length} flow(s) found
        </p>
        <button
          onClick={handleStartFlow}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Starting...' : 'Start Flow'}
        </button>
      </div>

      {flows.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No flows found. Start your first flow!</p>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flows.map((flow) => (
                <tr key={flow.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flow.employee_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      flow.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {flow.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(flow.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
