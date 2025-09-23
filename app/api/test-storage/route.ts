import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: {
      supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'missing',
      supabaseKey: supabaseKey ? `${supabaseKey.substring(0, 10)}...` : 'missing',
      nodeEnv: process.env.NODE_ENV || 'not set'
    },
    message: 'Quick environment check endpoint'
  })
}

export async function POST(request: NextRequest) {
  try {
    const { supabase } = await import('@/lib/supabase')
    
    console.log('Testing Supabase storage...')

    // Test 1: List buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('Failed to list buckets:', bucketsError)
      return NextResponse.json({
        success: false,
        step: 'list_buckets',
        error: bucketsError.message,
        details: bucketsError
      }, { status: 500 })
    }

    console.log('Available buckets:', buckets?.map(b => b.name))

    // Test 2: Check if registration-photos bucket exists
    const registrationBucketExists = buckets?.some(bucket => bucket.name === 'registration-photos')
    
    if (!registrationBucketExists) {
      // Try to create the bucket
      console.log('Creating registration-photos bucket...')
      const { data: createData, error: createError } = await supabase.storage.createBucket('registration-photos', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'],
        fileSizeLimit: 10485760 // 10MB
      })
      
      if (createError) {
        console.error('Failed to create bucket:', createError)
        return NextResponse.json({
          success: false,
          step: 'create_bucket',
          error: createError.message,
          details: createError
        }, { status: 500 })
      }
      
      console.log('Bucket created successfully:', createData)
    }

    // Test 3: Try a test upload
    const testContent = `Test upload at ${new Date().toISOString()}`
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' })
    const testFileName = `test-${Date.now()}.txt`
    
    console.log('Testing file upload...')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('registration-photos')
      .upload(testFileName, testFile)
    
    if (uploadError) {
      console.error('Test upload failed:', uploadError)
      return NextResponse.json({
        success: false,
        step: 'test_upload',
        error: uploadError.message,
        details: uploadError
      }, { status: 500 })
    }

    console.log('Test upload successful:', uploadData.path)

    // Test 4: Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('registration-photos')
      .getPublicUrl(testFileName)
    
    console.log('Public URL:', publicUrl)

    // Test 5: Clean up
    const { error: deleteError } = await supabase.storage
      .from('registration-photos')
      .remove([testFileName])
    
    if (deleteError) {
      console.warn('Failed to clean up test file:', deleteError)
    }

    return NextResponse.json({
      success: true,
      tests: {
        bucketsListed: true,
        bucketExists: registrationBucketExists,
        bucketCreated: !registrationBucketExists,
        uploadTest: true,
        publicUrlGenerated: !!publicUrl,
        cleanup: !deleteError
      },
      buckets: buckets?.map(b => ({ name: b.name, public: b.public })),
      testUpload: {
        fileName: testFileName,
        path: uploadData.path,
        publicUrl
      }
    })

  } catch (error) {
    console.error('Storage test error:', error)
    return NextResponse.json({
      success: false,
      step: 'unknown',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 })
  }
}