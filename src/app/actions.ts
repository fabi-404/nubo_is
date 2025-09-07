'use server'

import { createClient } from '@/lib/supabase-server'

export async function startOnboardingFlow() {
  const supabase = createClient()
  
  try {
    // Insert new onboarding flow
    const { data: flow, error: flowError } = await supabase
      .from('onboarding_flows')
      .insert({
        employee_email: 'newhire@example.com',
        status: 'pending'
      })
      .select()
      .single()

    if (flowError) {
      throw new Error(`Failed to create flow: ${flowError.message}`)
    }

    // Insert audit log
    const { error: auditError } = await supabase
      .from('audit_logs')
      .insert({
        action: 'onboarding_flow_started'
      })

    if (auditError) {
      throw new Error(`Failed to create audit log: ${auditError.message}`)
    }

    return { success: true, flow }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
