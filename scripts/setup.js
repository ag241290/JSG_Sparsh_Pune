#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('?? JSG SPARSH Portal Setup')
console.log('==========================\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    // Copy .env.example to .env.local
    fs.copyFileSync(envExamplePath, envPath)
    console.log('? Created .env.local from .env.example')
  } else {
    // Create basic .env.local
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`
    
    fs.writeFileSync(envPath, envContent)
    console.log('? Created .env.local file')
  }
} else {
  console.log('?? .env.local already exists')
}

console.log('\n?? Next Steps:')
console.log('1. Update .env.local with your Supabase credentials')
console.log('2. Run: npm run dev')

console.log('\n? Setup completed!')