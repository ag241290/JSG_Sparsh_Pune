import { NextRequest, NextResponse } from 'next/server'
import { uploadPhoto } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('=== UPLOAD TEST START ===')
    
    const formData = await request.formData()
    const file = formData.get('testFile') as File
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided for test'
      }, { status: 400 })
    }
    
    console.log('Testing upload with file:', {
      name: file.name,
      size: file.size,
      type: file.type
    })
    
    // Test the upload function
    const testId = `test-${Date.now()}`
    const result = await uploadPhoto(file, testId)
    
    if (result) {
      console.log('? Upload test successful:', result)
      return NextResponse.json({
        success: true,
        message: 'Upload test completed successfully',
        result: {
          publicUrl: result,
          testId
        }
      })
    } else {
      console.error('? Upload test failed')
      return NextResponse.json({
        success: false,
        error: 'Upload function returned null'
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('? Upload test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Upload test endpoint - POST a file as "testFile" to test upload functionality',
    usage: 'POST with multipart/form-data containing a "testFile" field'
  })
}