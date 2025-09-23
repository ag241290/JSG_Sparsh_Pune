import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing Supabase connection and storage...')

    // Test 1: Database connection
    const { data: dbTest, error: dbError } = await supabase
      .from('registrations')
      .select('id')
      .limit(1)

    console.log('Database test result:', { dbTest, dbError })

    // Test 2: Storage bucket access
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    console.log('Storage buckets:', { buckets, bucketsError })

    // Test 3: Check if registration-photos bucket exists
    let registrationPhotosExists = false
    if (buckets && !bucketsError) {
      registrationPhotosExists = buckets.some(bucket => bucket.name === 'registration-photos')
    }

    // Test 4: Try to list files in the bucket (if it exists)
    let bucketFiles = null
    let bucketError = null
    if (registrationPhotosExists) {
      const { data: files, error } = await supabase.storage
        .from('registration-photos')
        .list('', { limit: 5 })
      bucketFiles = files
      bucketError = error
    }

    return NextResponse.json({
      success: true,
      tests: {
        database: {
          success: !dbError,
          error: dbError?.message
        },
        storage: {
          bucketsAccessible: !bucketsError,
          bucketsError: bucketsError?.message,
          totalBuckets: buckets?.length || 0,
          registrationPhotosExists,
          bucketFilesTest: bucketFiles ? 'success' : bucketError?.message
        }
      },
      buckets: buckets?.map(b => ({ name: b.name, public: b.public })) || [],
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Supabase test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Testing file upload to Supabase storage...')

    // Create a simple test file
    const testContent = 'This is a test file for Supabase storage'
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' })
    const fileName = `test-${Date.now()}.txt`

    const { data, error } = await supabase.storage
      .from('registration-photos')
      .upload(fileName, testFile)

    if (error) {
      console.error('Test upload failed:', error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error
        },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('registration-photos')
      .getPublicUrl(fileName)

    // Clean up - delete the test file
    const { error: deleteError } = await supabase.storage
      .from('registration-photos')
      .remove([fileName])

    return NextResponse.json({
      success: true,
      uploadTest: {
        fileName,
        publicUrl,
        cleanup: !deleteError
      }
    })

  } catch (error) {
    console.error('Upload test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}