import { NextRequest, NextResponse } from 'next/server'
import { createRegistration, uploadPhoto, uploadRegistrationTransactionScreenshot } from '@/lib/supabase'

// Force Node.js runtime instead of Edge runtime
export const runtime = 'nodejs'

// Configure timeout for large file uploads
export const maxDuration = 120 // 2 minutes timeout

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('Registration API called at', new Date().toISOString())
  
  // Network diagnostics
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  console.log('SUPA_URL_OK', supabaseUrl?.length, supabaseUrl?.slice(0, 30))
  console.log('SR_KEY_LEN', process.env.SUPABASE_SERVICE_ROLE_KEY?.length)
  
  // Helper function to create fetch with timeout
  const fetchWithTimeout = async (url: string, timeoutMs: number = 5000) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    
    try {
      const response = await fetch(url, { 
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }
  
  try {
    const healthResponse = await fetchWithTimeout(supabaseUrl + '/auth/v1/health', 5000)
    console.log('AUTH_HEALTH_STATUS', healthResponse.status)
  } catch (healthError) {
    console.error('AUTH_HEALTH_FETCH_FAIL', healthError)
    // Continue anyway as this is just a health check
  }
  
  try {
    const storageResponse = await fetchWithTimeout(supabaseUrl + '/storage/v1/bucket', 5000)
    console.log('STORAGE_HEALTH_STATUS', storageResponse.status)
  } catch (storageError) {
    console.error('STORAGE_HEALTH_FETCH_FAIL', storageError)
    // Continue anyway as this is just a health check
  }
  
  try {
    console.log('Parsing form data...')
    const formData = await request.formData()
    console.log('FormData parsed successfully, processing fields...')

    // Extract and validate form fields
    const category = formData.get('category') as string
    const fullName = formData.get('fullName') as string
    const mobileNumber = formData.get('mobileNumber') as string
    const dateOfBirth = formData.get('dateOfBirth') as string  // Changed from age
    const skillset = formData.get('skillset') as string
    const bowlingArm = formData.get('bowlingArm') as string
    const battingStyle = formData.get('battingStyle') as string
    const jerseyName = formData.get('jerseyName') as string
    const jerseyNumber = formData.get('jerseyNumber') as string
    const jerseySize = formData.get('jerseySize') as string

    // Extract payment details
    const transactionId = formData.get('transactionId') as string
    const paymentStatus = formData.get('paymentStatus') as string || 'completed'

    // Validate required fields
    if (!category || !fullName || !mobileNumber || !dateOfBirth || !skillset || !bowlingArm || !battingStyle || !jerseyName || !jerseyNumber || !jerseySize) {
      console.error('Missing required fields')
      return NextResponse.json(
        { 
          error: 'Missing required fields. Please check that all form fields are filled out properly.',
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    // Validate transaction details if payment status is completed
    if (paymentStatus === 'completed' && !transactionId) {
      console.error('Missing transaction ID for completed payment')
      return NextResponse.json(
        { 
          error: 'Transaction ID is required for completed payments',
          code: 'PAYMENT_VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    // Validate date of birth and calculate age for validation
    const birthDate = new Date(dateOfBirth)
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { 
          error: 'Invalid date of birth. Please provide a valid date.',
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    // Validate jersey number
    const jerseyNum = parseInt(jerseyNumber)
    if (isNaN(jerseyNum)) {
      return NextResponse.json(
        { 
          error: 'Invalid jersey number. Please provide a numeric jersey number.',
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    // Handle parent name and optional fields
    const parentNameValue = formData.get('parentName') as string | null
    const parentName = parentNameValue ? parentNameValue.trim() : undefined
    const cricHeroesLinkValue = formData.get('cricHeroesLink') as string | null
    const cricHeroesLink = cricHeroesLinkValue ? cricHeroesLinkValue.trim() : undefined

    // Handle gender field for Kids category
    const genderValue = formData.get('gender') as string | null
    const gender = genderValue ? genderValue.trim() : undefined

    // Validate gender for Kids category
    if (category === 'kids' && !gender) {
      return NextResponse.json(
        { 
          error: 'Gender is required for Kids category',
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

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
            { 
              error: 'Failed to upload participant photo. Please check file format and try again.',
              code: 'UPLOAD_ERROR'
            },
            { status: 500 }
          )
        }
      } catch (photoError) {
        console.error('Photo upload error:', photoError)
        return NextResponse.json(
          { 
            error: 'Error processing participant photo. Please try again.',
            code: 'UPLOAD_ERROR'
          },
          { status: 500 }
        )
      }
    } else {
      console.error('No photo provided or photo is empty')
      return NextResponse.json(
        { 
          error: 'Participant photo is required',
          code: 'VALIDATION_ERROR'
        },
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
            { 
              error: 'Failed to upload transaction screenshot. Please check file format and try again.',
              code: 'UPLOAD_ERROR'
            },
            { status: 500 }
          )
        }
      } catch (screenshotError) {
        console.error('Transaction screenshot upload error:', screenshotError)
        return NextResponse.json(
          { 
            error: 'Error processing transaction screenshot. Please try again.',
            code: 'UPLOAD_ERROR'
          },
          { status: 500 }
        )
      }
    } else if (paymentStatus === 'completed') {
      console.error('No transaction screenshot provided for completed payment')
      return NextResponse.json(
        { 
          error: 'Transaction screenshot is required for completed payments',
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    // Create registration data with all details including gender for Kids
    const registrationData = {
      category: category as 'male' | 'female' | 'kids',
      full_name: fullName.trim(),
      parent_name: parentName,
      mobile_number: mobileNumber.trim(),
      date_of_birth: dateOfBirth,  // Changed from age: ageNum to date_of_birth: dateOfBirth
      gender: gender, // Added gender field for Kids category
      skillset: skillset,
      bowling_arm: bowlingArm,
      batting_style: battingStyle,
      cricket_experience: formData.get('cricketExperience') as string || undefined,
      cric_heroes_link: cricHeroesLink,
      jersey_name: jerseyName.trim(),
      jersey_number: jerseyNum,
      jersey_size: jerseySize,
      photo_url: photoUrl,
      transaction_id: transactionId || undefined,
      transaction_screenshot_url: transactionScreenshotUrl || undefined,
      payment_status: paymentStatus as 'pending' | 'completed' | 'failed'
    }

    console.log('Creating registration with data:', {
      category: registrationData.category,
      full_name: registrationData.full_name,
      gender: registrationData.gender,
      hasPhoto: !!photoUrl,
      hasTransactionScreenshot: !!transactionScreenshotUrl,
      hasTransactionId: !!transactionId,
      paymentStatus: registrationData.payment_status
    })

    const { data: registration, error } = await createRegistration(registrationData)

    if (error) {
      console.error('Registration creation failed:', error)
      return NextResponse.json(
        { 
          error: `Database error: ${error.message || 'Failed to save registration'}`,
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      )
    }

    if (!registration) {
      console.error('No registration data returned')
      return NextResponse.json(
        { 
          error: 'Failed to create registration - no data returned',
          code: 'UNKNOWN_ERROR'
        },
        { status: 500 }
      )
    }

    console.log('Registration created successfully:', {
      id: registration.id,
      category: registration.category,
      gender: registration.gender,
      payment_status: registration.payment_status
    })

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        category: registration.category,
        full_name: registration.full_name,
        gender: registration.gender,
        mobile_number: registration.mobile_number,
        payment_status: registration.payment_status,
        transaction_id: registration.transaction_id,
        photo_url: registration.photo_url,
        transaction_screenshot_url: registration.transaction_screenshot_url
      }
    })

  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error('Registration API error after', processingTime, 'ms:', error)
    
    let errorMessage = 'Internal server error occurred. Please try again.'
    let errorCode = 'INTERNAL_ERROR'
    let statusCode = 500
    
    if (error instanceof Error) {
      // Handle timeout errors
      if (error.message.includes('timeout') || error.message.includes('TIMEOUT')) {
        errorMessage = 'Request timeout. This may be due to large file uploads or slow internet connection. Please try again.'
        errorCode = 'TIMEOUT_ERROR'
        statusCode = 408
      }
      // Handle network/connection errors
      else if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ECONNRESET')) {
        errorMessage = 'Network connection error. Please check your internet connection and try again.'
        errorCode = 'NETWORK_ERROR'
        statusCode = 503
      }
      // Handle Supabase specific errors
      else if (error.message.includes('supabase') || error.message.includes('storage')) {
        errorMessage = 'Storage service temporarily unavailable. Please try again in a few moments.'
        errorCode = 'STORAGE_ERROR'
        statusCode = 503
      }
      // Handle validation errors
      else if (error.message.includes('validation') || error.message.includes('invalid')) {
        errorMessage = `Validation error: ${error.message}`
        errorCode = 'VALIDATION_ERROR'
        statusCode = 400
      }
      // Generic error with message
      else {
        errorMessage = `Server error: ${error.message}`
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        code: errorCode,
        processingTime,
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : String(error)) : undefined
      },
      { status: statusCode }
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