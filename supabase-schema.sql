-- Create onboarding_flows table
CREATE TABLE onboarding_flows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE onboarding_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your auth setup)
CREATE POLICY "Users can view their own flows" ON onboarding_flows
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert flows" ON onboarding_flows
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
