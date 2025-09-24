import { NextRequest, NextResponse } from 'next/server'
import { createRegistration, uploadPhoto, uploadRegistrationTransactionScreenshot } from '@/lib/supabase'

// Force Node.js runtime instead of Edge runtime
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  console.log('Registration API called')
  
  // Network diagnostics
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  console.log('SUPA_URL_OK', supabaseUrl?.length, supabaseUrl?.slice(0, 30))
  console.log('SR_KEY_LEN', process.env.SUPABASE_SERVICE_ROLE_KEY?.length)
  
  try {
    const healthResponse = await fetch(supabaseUrl + '/auth/v1/health')
    console.log('AUTH_HEALTH_STATUS', healthResponse.status)
  } catch (healthError) {
    console.error('AUTH_HEALTH_FETCH_FAIL', healthError)
  }
  
  try {
    const storageResponse = await fetch(supabaseUrl + '/storage/v1/bucket')
    console.log('STORAGE_HEALTH_STATUS', storageResponse.status)
  } catch (storageError) {
    console.error('STORAGE_HEALTH_FETCH_FAIL', storageError)
  }
  
  try {
    const formData = await request.formData()
    console.log('FormData received')

    // Extract and validate form fields
    const category = formData.get('category') as string
    const fullName = formData.get('fullName') as string
    const mobileNumber = formData.get('mobileNumber') as string
    const age = formData.get('age') as string
    const skillset = formData.get('skillset') as string
    const bowlingArm = formData.get('bowlingArm') as string
    const jerseyName = formData.get('jerseyName') as string
    const jerseyNumber = formData.get('jerseyNumber') as string
    const jerseySize = formData.get('jerseySize') as string

    // Extract payment details
    const transactionId = formData.get('transactionId') as string
    const paymentStatus = formData.get('paymentStatus') as string || 'completed'

    // Validate required fields
    if (!category || !fullName || !mobileNumber || !age || !skillset || !bowlingArm || !jerseyName || !jerseyNumber || !jerseySize) {
      console.error('Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate transaction details if payment status is completed
    if (paymentStatus === 'completed' && !transactionId) {
      console.error('Missing transaction ID for completed payment')
      return NextResponse.json(
        { error: 'Transaction ID is required for completed payments' },
        { status: 400 }
      )
    }

    // Validate data types
    const ageNum = parseInt(age)
    const jerseyNum = parseInt(jerseyNumber)

    if (isNaN(ageNum) || isNaN(jerseyNum)) {
      return NextResponse.json(
        { error: 'Invalid age or jersey number' },
        { status: 400 }
      )
    }

    // Handle parent name and optional fields
    const parentNameValue = formData.get('parentName') as string | null
    const parentName = parentNameValue ? parentNameValue.trim() : undefined
    const cricHeroesLinkValue = formData.get('cricHeroesLink') as string | null
    const cricHeroesLink = cricHeroesLinkValue ? cricHeroesLinkValue.trim() : undefined

    // Generate unique ID for file uploads
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Handle photo upload
    const photo = formData.get('photo') as File
    let photoUrl = null

    if (photo && photo.size > 0) {
      console.log('Processing photo upload:', photo.name, `${photo.size} bytes`)
      
      try {
        photoUrl = await uploadPhoto(photo, `${uniqueId}-photo`)
        
        if (photoUrl) {
          console.log('Photo uploaded successfully:', photoUrl)
        } else {
          console.error('Photo upload returned null')
          return NextResponse.json(
            { error: 'Failed to upload participant photo. Please check file format and try again.' },
            { status: 500 }
          )
        }
      } catch (photoError) {
        console.error('Photo upload error:', photoError)
        return NextResponse.json(
          { error: 'Error processing participant photo. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      console.error('No photo provided or photo is empty')
      return NextResponse.json(
        { error: 'Participant photo is required' },
        { status: 400 }
      )
    }

    // Handle transaction screenshot upload
    const transactionScreenshot = formData.get('transactionScreenshot') as File
    let transactionScreenshotUrl = null

    if (transactionScreenshot && transactionScreenshot.size > 0) {
      console.log('Processing transaction screenshot upload:', transactionScreenshot.name, `${transactionScreenshot.size} bytes`)
      
      try {
        transactionScreenshotUrl = await uploadRegistrationTransactionScreenshot(transactionScreenshot, uniqueId)
        
        if (transactionScreenshotUrl) {
          console.log('Transaction screenshot uploaded successfully:', transactionScreenshotUrl)
        } else {
          console.error('Transaction screenshot upload returned null')
          return NextResponse.json(
            { error: 'Failed to upload transaction screenshot. Please check file format and try again.' },
            { status: 500 }
          )
        }
      } catch (screenshotError) {
        console.error('Transaction screenshot upload error:', screenshotError)
        return NextResponse.json(
          { error: 'Error processing transaction screenshot. Please try again.' },
          { status: 500 }
        )
      }
    } else if (paymentStatus === 'completed') {
      console.error('No transaction screenshot provided for completed payment')
      return NextResponse.json(
        { error: 'Transaction screenshot is required for completed payments' },
        { status: 400 }
      )
    }

    // Create registration data with all details including transaction info
    const registrationData = {
      category: category as 'male' | 'female' | 'kids',
      full_name: fullName.trim(),
      parent_name: parentName,
      mobile_number: mobileNumber.trim(),
      age: ageNum,
      skillset: skillset,
      bowling_arm: bowlingArm,
      cricket_experience: formData.get('cricketExperience') as string || undefined,
      cric_heroes_link: cricHeroesLink,
      jersey_name: jerseyName.trim(),
      jersey_number: jerseyNum,
      jersey_size: jerseySize,
      photo_url: photoUrl,
      transaction_id: transactionId || undefined,
      transaction_screenshot_url: transactionScreenshotUrl || undefined,
      payment_status: paymentStatus as 'pending' | 'completed' | 'failed',
      approved: false
    }

    console.log('Creating registration with data:', {
      category: registrationData.category,
      full_name: registrationData.full_name,
      hasPhoto: !!photoUrl,
      hasTransactionScreenshot: !!transactionScreenshotUrl,
      hasTransactionId: !!transactionId,
      paymentStatus: registrationData.payment_status
    })

    const { data: registration, error } = await createRegistration(registrationData)

    if (error) {
      console.error('Registration creation failed:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message || 'Failed to save registration'}` },
        { status: 500 }
      )
    }

    if (!registration) {
      console.error('No registration data returned')
      return NextResponse.json(
        { error: 'Failed to create registration - no data returned' },
        { status: 500 }
      )
    }

    console.log('Registration created successfully:', {
      id: registration.id,
      category: registration.category,
      payment_status: registration.payment_status
    })

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        category: registration.category,
        full_name: registration.full_name,
        mobile_number: registration.mobile_number,
        payment_status: registration.payment_status,
        transaction_id: registration.transaction_id,
        photo_url: registration.photo_url,
        transaction_screenshot_url: registration.transaction_screenshot_url
      }
    })

  } catch (error) {
    console.error('Registration API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error occurred. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Registration API endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}