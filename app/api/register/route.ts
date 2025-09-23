import { NextRequest, NextResponse } from 'next/server'
import { createRegistration, uploadPhoto } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('Registration API called')
  
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

    // Validate required fields
    if (!category || !fullName || !mobileNumber || !age || !skillset || !bowlingArm || !jerseyName || !jerseyNumber || !jerseySize) {
      console.error('Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // First, handle photo upload if provided
    const photo = formData.get('photo') as File
    let photoUrl = null

    if (photo && photo.size > 0) {
      console.log('Processing photo upload:', photo.name, `${photo.size} bytes`)
      
      // Generate temporary ID for photo upload
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      try {
        photoUrl = await uploadPhoto(photo, tempId)
        
        if (photoUrl) {
          console.log('Photo uploaded successfully to storage:', photoUrl)
        } else {
          console.error('Photo upload to storage failed')
          return NextResponse.json(
            { error: 'Failed to upload photo. Please try again.' },
            { status: 500 }
          )
        }
      } catch (photoError) {
        console.error('Photo processing error:', photoError)
        return NextResponse.json(
          { error: 'Failed to process photo. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Create registration data with photo URL included
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
      photo_url: photoUrl || undefined, // Convert null to undefined for TypeScript compatibility
      payment_status: 'pending' as const,
      approved: false
    }

    console.log('Creating registration with photo URL:', photoUrl ? 'included' : 'none')
    const { data: registration, error } = await createRegistration(registrationData)

    if (error) {
      console.error('Registration creation failed:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message || 'Unknown error'}` },
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

    console.log('Registration created successfully with ID:', registration.id)
    console.log('Photo URL in registration:', registration.photo_url)

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        category: registration.category,
        full_name: registration.full_name,
        mobile_number: registration.mobile_number,
        payment_status: registration.payment_status,
        photo_url: registration.photo_url
      }
    })

  } catch (error) {
    console.error('Registration API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
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