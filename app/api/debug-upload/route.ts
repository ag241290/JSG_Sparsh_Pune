import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== SIMPLE UPLOAD TEST START ===')
    
    // Import uploadPhoto function
    const { uploadPhoto } = await import('@/lib/supabase')
    
    const formData = await request.formData()
    const photo = formData.get('photo') as File
    const transactionScreenshot = formData.get('transactionScreenshot') as File
    
    console.log('Received files:', {
      photo: photo ? { name: photo.name, size: photo.size, type: photo.type } : 'none',
      transactionScreenshot: transactionScreenshot ? { name: transactionScreenshot.name, size: transactionScreenshot.size, type: transactionScreenshot.type } : 'none'
    })
    
    const testId = `debug-test-${Date.now()}`
    
    // Test photo upload
    let photoResult = null
    if (photo) {
      console.log('?? Testing photo upload...')
      photoResult = await uploadPhoto(photo, `${testId}-photo`)
      console.log('Photo upload result:', photoResult)
    }
    
    // Test transaction screenshot upload
    let screenshotResult = null
    if (transactionScreenshot) {
      console.log('?? Testing transaction screenshot upload...')
      screenshotResult = await uploadPhoto(transactionScreenshot, `${testId}-transaction`)
      console.log('Transaction screenshot upload result:', screenshotResult)
    }
    
    console.log('=== SIMPLE UPLOAD TEST END ===')
    
    return NextResponse.json({
      success: true,
      results: {
        photo: {
          provided: !!photo,
          uploaded: !!photoResult,
          url: photoResult
        },
        transactionScreenshot: {
          provided: !!transactionScreenshot,
          uploaded: !!screenshotResult,
          url: screenshotResult
        }
      },
      testId
    })
    
  } catch (error) {
    console.error('=== SIMPLE UPLOAD TEST ERROR ===')
    console.error('Error details:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Simple upload test endpoint',
    usage: 'POST with multipart/form-data containing "photo" and/or "transactionScreenshot" fields'
  })
}