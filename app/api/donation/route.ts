import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const mobile_number = formData.get('mobile_number') as string
    const amount = formData.get('amount') as string
    const transaction_id = formData.get('transaction_id') as string
    const transaction_screenshot = formData.get('transaction_screenshot') as File

    // Validate required fields
    if (!name || !mobile_number || !amount || !transaction_id || !transaction_screenshot) {
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

    // Validate amount
    const amountValue = parseFloat(amount)
    if (isNaN(amountValue) || amountValue <= 0) {
      return NextResponse.json(
        { error: 'Please enter a valid amount' },
        { status: 400 }
      )
    }

    if (amountValue > 999999.99) {
      return NextResponse.json(
        { error: 'Amount cannot exceed ?9,99,999.99' },
        { status: 400 }
      )
    }

    // Validate file
    if (transaction_screenshot.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(transaction_screenshot.type)) {
      return NextResponse.json(
        { error: 'Please upload a valid image file (JPG, JPEG, PNG)' },
        { status: 400 }
      )
    }

    // Upload screenshot to Supabase Storage - using the correct bucket name
    let screenshot_url = null
    if (transaction_screenshot) {
      const fileExt = transaction_screenshot.name.split('.').pop()
      const fileName = `donation-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('donation-transaction-ss')
        .upload(fileName, transaction_screenshot)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return NextResponse.json(
          { error: 'Failed to upload transaction screenshot' },
          { status: 500 }
        )
      }

      if (uploadData) {
        const { data: urlData } = supabase.storage
          .from('donation-transaction-ss')
          .getPublicUrl(uploadData.path)
        
        screenshot_url = urlData.publicUrl
      }
    }

    // Save to database
    const { data, error: dbError } = await supabase
      .from('donations')
      .insert([
        {
          name: name.trim(),
          mobile_number: mobile_number.trim(),
          amount: amountValue,
          transaction_id: transaction_id.trim(),
          transaction_screenshot_url: screenshot_url,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save donation details' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Donation details submitted successfully',
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