#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('?? JSG SPARSH Portal - Deployment Fix Script')
console.log('=============================================\n')

// 1. Check and fix vercel.json
const vercelPath = path.join(process.cwd(), 'vercel.json')
if (fs.existsSync(vercelPath)) {
  const vercelConfig = fs.readFileSync(vercelPath, 'utf8')
  
  if (vercelConfig.includes('@vercel/static-build') || vercelConfig.includes('distDir')) {
    console.log('??  Found problematic vercel.json configuration')
    console.log('?? Fixing vercel.json...')
    
    const correctConfig = {
      framework: "nextjs"
    }
    
    fs.writeFileSync(vercelPath, JSON.stringify(correctConfig, null, 2))
    console.log('? Fixed vercel.json configuration\n')
  } else {
    console.log('? vercel.json configuration looks good\n')
  }
} else {
  console.log('??  No vercel.json found (this is fine - Vercel will auto-detect)\n')
}

// 2. Check next.config.js
const nextConfigPath = path.join(process.cwd(), 'next.config.js')
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
  
  if (nextConfig.includes("output: 'export'")) {
    console.log('? Found "output: export" in next.config.js - this breaks API routes!')
    console.log('   Please manually remove this line from next.config.js')
  } else {
    console.log('? next.config.js looks good')
  }
} else {
  console.log('??  No next.config.js found')
}

// 3. Check if build artifacts exist
const artifactDirs = ['.next', 'out', 'build', 'dist']
let foundArtifacts = false

artifactDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir)
  if (fs.existsSync(dirPath)) {
    console.log(`??  Found build artifact directory: ${dir}`)
    foundArtifacts = true
  }
})

if (foundArtifacts) {
  console.log('\n?? To clean build artifacts, run:')
  console.log('   git rm -r --cached .next/ out/ build/ dist/ 2>/dev/null || true')
  console.log('   git commit -m "Remove build artifacts"')
} else {
  console.log('? No build artifacts found in repository')
}

// 4. Check page structure
const requiredPages = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/spl02/page.tsx',
  'app/register-now/page.tsx',
  'app/admin/page.tsx'
]

console.log('\n?? Checking page structure:')
requiredPages.forEach(page => {
  const pagePath = path.join(process.cwd(), page)
  if (fs.existsSync(pagePath)) {
    console.log(`   ? ${page}`)
  } else {
    console.log(`   ? ${page} - MISSING!`)
  }
})

// 5. Check API routes
const requiredAPI = [
  'app/api/register/route.ts'
]

console.log('\n?? Checking API routes:')
requiredAPI.forEach(api => {
  const apiPath = path.join(process.cwd(), api)
  if (fs.existsSync(apiPath)) {
    console.log(`   ? ${api}`)
  } else {
    console.log(`   ? ${api} - MISSING!`)
  }
})

console.log('\n?? Next Steps:')
console.log('1. If any files are missing, restore them from backup')
console.log('2. Commit and push changes to GitHub')
console.log('3. Redeploy on Vercel (should auto-trigger)')
console.log('4. Test all routes after deployment')

console.log('\n?? Expected URLs after fix:')
console.log('   https://your-project.vercel.app/')
console.log('   https://your-project.vercel.app/spl02')
console.log('   https://your-project.vercel.app/register-now')
console.log('   https://your-project.vercel.app/admin')
console.log('   https://your-project.vercel.app/api/register')

console.log('\n? Fix script completed!')