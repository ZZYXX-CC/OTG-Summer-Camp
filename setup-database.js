const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Create the registrations table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS registrations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        registration_id TEXT UNIQUE NOT NULL,
        
        -- Participant Information
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        date_of_birth DATE NOT NULL,
        age INTEGER NOT NULL,
        
        -- Parent/Guardian Information
        parent_name TEXT NOT NULL,
        parent_email TEXT NOT NULL,
        parent_phone TEXT NOT NULL,
        
        -- Emergency Contact Information
        emergency_name TEXT NOT NULL,
        emergency_phone TEXT NOT NULL,
        
        -- Medical Information
        allergies TEXT,
        medical_conditions TEXT,
        medications TEXT,
        dietary_restrictions TEXT,
        
        -- Football Experience
        has_experience BOOLEAN DEFAULT FALSE,
        experience_details TEXT,
        preferred_position TEXT,
        dominant_foot TEXT,
        
        -- Payment Information
        has_paid BOOLEAN DEFAULT FALSE,
        payment_method TEXT,
        amount_paid DECIMAL(10,2),
        
        -- Metadata
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const { error: tableError } = await supabase.rpc('exec', { sql: createTableSQL });
    
    if (tableError) {
      console.error('Error creating table:', tableError);
      // Try alternative approach
      console.log('Trying alternative approach...');
      
      // Test if table exists by trying to select from it
      const { data, error: selectError } = await supabase
        .from('registrations')
        .select('id')
        .limit(1);
      
      if (selectError && selectError.code === '42P01') {
        console.log('Table does not exist. Please create it manually in Supabase dashboard.');
        console.log('Use the SQL from supabase/migrations/20241226000000_create_registrations_table.sql');
      } else {
        console.log('Table already exists or was created successfully!');
      }
    } else {
      console.log('Database setup completed successfully!');
      console.log('Registrations table created.');
    }
    
  } catch (error) {
    console.error('Setup failed:', error);
    console.log('\nPlease manually create the table using the Supabase dashboard:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy and paste the SQL from supabase/migrations/20241226000000_create_registrations_table.sql');
    console.log('4. Run the SQL query');
  }
}

setupDatabase();