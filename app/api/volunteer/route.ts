import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, address, mobile_number } = body

    // Validate required fields
    if (!name || !address || !mobile_number) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile_number)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      )
    }

    // Save to database with enquiry_type = 'Volunteer'
    const { data, error: dbError } = await supabase
      .from('enquiries')
      .insert([
        {
          name: name.trim(),
          address: address.trim(),
          mobile_number: mobile_number.trim(),
          type: 'volunteer',
          enquiry_type: 'Volunteer',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save volunteer application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Volunteer application submitted successfully',
      data 
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}