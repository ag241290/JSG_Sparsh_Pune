const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

console.log('?? Checking environment variables...')
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.error('? Missing required environment variables:', missingVars)
  console.log('\n?? Please create a .env.local file with:')
  missingVars.forEach(varName => {
    console.log(`${varName}=your_${varName.toLowerCase()}_here`)
  })
  process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runSetup() {
  console.log('?? Starting JSG SPARSH Pune Portal setup...\n')

  try {
    // Test connection
    console.log('?? Testing Supabase connection...')
    const { data: testData, error: testError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .limit(1)

    if (testError) {
      console.error('? Connection failed:', testError.message)
      process.exit(1)
    }
    console.log('? Supabase connection successful')

    // Verify storage buckets (assuming they're already created)
    console.log('\n?? Verifying storage buckets...')
    
    const buckets = [
      {
        name: 'registration-photos',
        description: 'Profile pictures from Registration form (/register-now/)',
        config: {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'],
          fileSizeLimit: 10485760 // 10MB
        }
      },
      {
        name: 'registration-transaction-ss',
        description: 'Transaction screenshots from payment page (/register-now/)',
        config: {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
          fileSizeLimit: 10485760 // 10MB
        }
      },
      {
        name: 'donation-transaction-ss',
        description: 'Transaction screenshots from social donation page (/social/)',
        config: {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
          fileSizeLimit: 10485760 // 10MB
        }
      }
    ]

    for (const bucket of buckets) {
      const { data: existingBucket } = await supabase.storage.getBucket(bucket.name)
      
      if (!existingBucket) {
        const { data, error } = await supabase.storage.createBucket(bucket.name, bucket.config)
        if (error) {
          console.error(`? Failed to create ${bucket.name} bucket:`, error.message)
        } else {
          console.log(`? Created ${bucket.name} bucket - ${bucket.description}`)
        }
      } else {
        console.log(`? ${bucket.name} bucket exists - ${bucket.description}`)
      }
    }

    // Run SQL migrations
    console.log('\n???  Running database migrations...')
    
    const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations')
    const migrationFiles = [
      '001_create_registrations.sql',
      '002_add_transaction_fields.sql',
      '003_create_social_tables.sql'
    ]

    for (const migrationFile of migrationFiles) {
      const migrationPath = path.join(migrationsDir, migrationFile)
      
      if (fs.existsSync(migrationPath)) {
        console.log(`?? Running migration: ${migrationFile}`)
        const sql = fs.readFileSync(migrationPath, 'utf8')
        
        const { error } = await supabase.rpc('exec_sql', { sql })
        if (error) {
          // Try alternative method for complex SQL
          const statements = sql.split(';').filter(stmt => stmt.trim())
          let hasError = false
          
          for (const statement of statements) {
            if (statement.trim()) {
              const { error: stmtError } = await supabase.rpc('exec_sql', { 
                sql: statement + ';' 
              })
              if (stmtError) {
                console.log(`??  Statement in ${migrationFile} may already exist or need manual execution:`, stmtError.message)
                hasError = true
              }
            }
          }
          
          if (!hasError) {
            console.log(`? Migration ${migrationFile} completed`)
          }
        } else {
          console.log(`? Migration ${migrationFile} completed`)
        }
      } else {
        console.log(`??  Migration file not found: ${migrationFile}`)
      }
    }

    // Verify table creation
    console.log('\n?? Verifying database setup...')
    
    const tables = [
      { name: 'registrations', description: 'SPL 02 tournament registrations' },
      { name: 'donations', description: 'Social initiative donation records' },
      { name: 'enquiries', description: 'Volunteer applications and membership enquiries' }
    ]
    
    for (const table of tables) {
      const { data, error } = await supabase.from(table.name).select('*').limit(0)
      if (error && error.code === 'PGRST116') {
        console.log(`? Table '${table.name}' does not exist - ${table.description}`)
      } else {
        console.log(`? Table '${table.name}' is ready - ${table.description}`)
      }
    }

    // Create example .env.local if it doesn't exist
    const envLocalPath = path.join(__dirname, '..', '.env.local')
    if (!fs.existsSync(envLocalPath)) {
      const envExample = path.join(__dirname, '..', '.env.example')
      if (fs.existsSync(envExample)) {
        fs.copyFileSync(envExample, envLocalPath)
        console.log('\n?? Created .env.local from .env.example')
        console.log('??  Please update .env.local with your actual Supabase credentials')
      }
    }

    console.log('\n?? Setup completed successfully!')
    console.log('\n?? Storage Bucket Usage:')
    console.log('   ?? registration-photos: Profile pictures from /register-now/')
    console.log('   ?? registration-transaction-ss: Payment screenshots from /register-now/')
    console.log('   ?? donation-transaction-ss: Donation screenshots from /social/')
    console.log('\n?? Database Tables:')
    console.log('   ?? registrations: Tournament registrations')
    console.log('   ?? donations: Social initiative donations')
    console.log('   ?? enquiries: Volunteer applications and membership enquiries')
    console.log('      - enquiry_type: "Volunteer" for volunteer applications')
    console.log('      - enquiry_type: "JoinUs" for membership applications')
    console.log('\n?? Next steps:')
    console.log('1. Ensure SPARSH_QR_Code.jpeg is in public/images/')
    console.log('2. Run: npm run dev')
    console.log('3. Visit: http://localhost:3000')
    console.log('4. Test registration, social, and join us features')
    console.log('\n?? Important URLs:')
    console.log('   - Homepage: http://localhost:3000')
    console.log('   - Registration: http://localhost:3000/register-now')
    console.log('   - Social: http://localhost:3000/social')
    console.log('   - Admin: http://localhost:3000/admin')

  } catch (error) {
    console.error('\n? Setup failed:', error.message)
    console.log('\n?? Troubleshooting:')
    console.log('1. Check your .env.local file has correct Supabase credentials')
    console.log('2. Verify your Supabase project is active')
    console.log('3. Ensure service role key has proper permissions')
    process.exit(1)
  }
}

runSetup()