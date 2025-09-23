import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL format')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection function - simplified and more robust
export const testConnection = async (): Promise<boolean> => {
  try {
    // Simple test that should work if connection is valid
    const { data, error } = await supabase
      .from('registrations')
      .select('id')
      .limit(1)
    
    // If we get data or a permission error, connection is working
    if (data !== null || (error && !error.message.includes('fetch failed'))) {
      return true
    }
    
    console.error('Connection test failed:', error)
    return false
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}

// Check if registrations table exists
export const checkRegistrationsTable = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('registrations')
      .select('id')
      .limit(0)
    
    // If no error or error is not about table existence, table exists
    return !error || !error.message?.includes('does not exist')
  } catch (error) {
    console.error('Error checking registrations table:', error)
    return false
  }
}

// Database Types
export interface Registration {
  id?: string
  category: 'male' | 'female' | 'kids'
  
  // Personal Info
  full_name: string
  parent_name?: string // Only for kids
  mobile_number: string
  age: number
  
  // Cricket Info
  skillset: string
  bowling_arm: string
  cricket_experience?: string
  cric_heroes_link?: string
  
  // Jersey Details
  jersey_name: string
  jersey_number: number
  jersey_size: string
  
  // Files & Status
  photo_url?: string
  payment_status: 'pending' | 'completed' | 'failed'
  registration_date?: string
  
  // Admin fields
  approved: boolean
  team_assigned?: string
  
  created_at?: string
  updated_at?: string
}

// File Upload Helper
export const uploadPhoto = async (file: File, registrationId: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${registrationId}-${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('registration-photos')
      .upload(fileName, file)

    if (error) {
      console.error('Error uploading file:', error)
      return null
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('registration-photos')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Error uploading photo:', error)
    return null
  }
}

// Registration Functions
export const createRegistration = async (registrationData: Omit<Registration, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Registration | null, error: any }> => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select()
      .single()

    return { data, error }
  } catch (error) {
    console.error('Error creating registration:', error)
    return { data: null, error }
  }
}

export const getRegistrations = async (): Promise<{ data: Registration[] | null, error: any }> => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })

    return { data, error }
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return { data: null, error }
  }
}

export const updatePaymentStatus = async (id: string, paymentStatus: 'pending' | 'completed' | 'failed'): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('registrations')
      .update({ payment_status: paymentStatus })
      .eq('id', id)

    return { error }
  } catch (error) {
    console.error('Error updating payment status:', error)
    return { error }
  }
}