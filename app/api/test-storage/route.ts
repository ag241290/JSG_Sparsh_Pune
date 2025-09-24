import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('?? Testing storage bucket access...')
    
    // Test 1: List buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    console.log('Available buckets:', buckets?.map(b => b.name) || 'none')
    if (bucketsError) console.error('Buckets error:', bucketsError)

    // Test 2: Check specific bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('registration-transaction-ss')
    console.log('registration-transaction-ss bucket:', bucketData)
    if (bucketError) console.error('Bucket error:', bucketError)

    // Test 3: Try to upload a simple test file
    const testFileContent = new Blob(['test content'], { type: 'text/plain' })
    const testFile = new File([testFileContent], 'test.txt', { type: 'text/plain' })
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('registration-transaction-ss')
      .upload(`test-${Date.now()}.txt`, testFile)
    
    console.log('Test upload result:', { uploadData, uploadError })

    // Test 4: Try image upload to the bucket
    const formData = await request.formData()
    const testImage = formData.get('testImage') as File
    
    if (testImage) {
      console.log('Testing image upload:', { name: testImage.name, size: testImage.size, type: testImage.type })
      
      const fileName = `test-image-${Date.now()}.${testImage.name.split('.').pop()}`
      const { data: imageUploadData, error: imageUploadError } = await supabase.storage
        .from('registration-transaction-ss')
        .upload(fileName, testImage)
      
      console.log('Image upload result:', { imageUploadData, imageUploadError })
      
      if (imageUploadData) {
        const { data: publicUrl } = supabase.storage
          .from('registration-transaction-ss')
          .getPublicUrl(imageUploadData.path)
        console.log('Public URL:', publicUrl)
      }
    }

    return NextResponse.json({
      success: true,
      buckets: buckets?.map(b => b.name) || [],
      bucketExists: !!bucketData,
      testUpload: uploadData ? 'success' : 'failed',
      uploadError: uploadError?.message,
      imageUpload: testImage ? (uploadData ? 'success' : 'failed') : 'no image provided'
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}