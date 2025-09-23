// Supabase Storage Bucket Setup
import { supabase } from '../lib/supabase.js'

async function setupStorageBucket() {
  try {
    console.log('?? Setting up Supabase storage bucket...')

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('? Failed to list buckets:', listError.message)
      return false
    }

    const bucketExists = buckets.some(bucket => bucket.name === 'registration-photos')
    
    if (bucketExists) {
      console.log('? Storage bucket "registration-photos" already exists')
      return true
    }

    // Create bucket
    console.log('?? Creating storage bucket "registration-photos"...')
    const { data, error } = await supabase.storage.createBucket('registration-photos', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'],
      fileSizeLimit: 10485760 // 10MB
    })

    if (error) {
      console.error('? Failed to create bucket:', error.message)
      return false
    }

    console.log('? Storage bucket created successfully')
    return true

  } catch (error) {
    console.error('? Storage setup error:', error)
    return false
  }
}

async function testUpload() {
  try {
    console.log('?? Testing file upload...')
    
    const testContent = 'Test file for JSG SPARSH registration system'
    const testFile = new File([testContent], 'test-upload.txt', { type: 'text/plain' })
    const fileName = `test-${Date.now()}.txt`

    const { data, error } = await supabase.storage
      .from('registration-photos')
      .upload(fileName, testFile)

    if (error) {
      console.error('? Test upload failed:', error.message)
      return false
    }

    console.log('? Test upload successful')

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('registration-photos')
      .getPublicUrl(fileName)

    console.log('?? Public URL:', publicUrl)

    // Clean up
    const { error: deleteError } = await supabase.storage
      .from('registration-photos')
      .remove([fileName])

    if (deleteError) {
      console.warn('??  Failed to clean up test file:', deleteError.message)
    } else {
      console.log('?? Test file cleaned up successfully')
    }

    return true

  } catch (error) {
    console.error('? Upload test error:', error)
    return false
  }
}

async function main() {
  console.log('?? JSG SPARSH - Supabase Storage Setup')
  console.log('=====================================')

  const bucketSetup = await setupStorageBucket()
  if (!bucketSetup) {
    console.log('? Storage bucket setup failed')
    process.exit(1)
  }

  const uploadTest = await testUpload()
  if (!uploadTest) {
    console.log('? Upload test failed')
    process.exit(1)
  }

  console.log('? All storage tests passed!')
  console.log('?? Supabase storage is ready for JSG SPARSH registrations!')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { setupStorageBucket, testUpload }