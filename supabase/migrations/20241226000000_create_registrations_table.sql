-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Participant Information
  participant_first_name TEXT NOT NULL,
  participant_last_name TEXT NOT NULL,
  participant_email TEXT,
  participant_phone TEXT,
  participant_date_of_birth DATE NOT NULL,
  participant_age INTEGER NOT NULL,
  
  -- Parent/Guardian Information
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  
  -- Emergency Contact
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  
  -- Medical Information
  allergies TEXT,
  medical_conditions TEXT,
  medications TEXT,
  dietary_restrictions TEXT,
  
  -- Football Experience
  has_football_experience BOOLEAN DEFAULT FALSE,
  football_experience_details TEXT,
  preferred_position TEXT,
  dominant_foot TEXT,
  
  -- Payment Information
  has_paid BOOLEAN DEFAULT FALSE,
  payment_method TEXT,
  amount_paid DECIMAL(10,2)
);

-- Create an index on registration_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_registration_id ON registrations(registration_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Create an index on parent_email for lookups
CREATE INDEX IF NOT EXISTS idx_registrations_parent_email ON registrations(parent_email);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for service role
-- (This will be used by our API routes with the service role key)
CREATE POLICY "Allow all operations for service role" ON registrations
  FOR ALL USING (auth.role() = 'service_role');

-- Create a policy for authenticated users to read their own registrations
-- (Optional: if you want to allow users to view their registrations later)
CREATE POLICY "Users can view own registrations" ON registrations
  FOR SELECT USING (participant_email = auth.email() OR parent_email = auth.email());