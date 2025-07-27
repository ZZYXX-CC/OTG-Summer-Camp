import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Registration {
  id?: string
  registration_id: string
  created_at?: string
  
  // Participant Information
  participant_first_name: string
  participant_last_name: string
  participant_email?: string
  participant_phone?: string
  participant_date_of_birth: string
  participant_age: number
  
  // Parent/Guardian Information
  parent_name: string
  parent_email: string
  parent_phone: string
  
  // Emergency Contact
  emergency_contact_name: string
  emergency_contact_phone: string
  
  // Medical Information
  allergies?: string
  medical_conditions?: string
  medications?: string
  dietary_restrictions?: string
  
  // Football Experience
  has_football_experience: boolean
  football_experience_details?: string
  preferred_position?: string
  dominant_foot?: string
  
  // Payment Information
  has_paid: boolean
  payment_method?: string
  amount_paid?: number
}