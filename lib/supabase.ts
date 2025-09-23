import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
if (!supabaseAnonKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')

try { new URL(supabaseUrl) } catch { throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL format') }

// Public client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service role client (server only)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseServer = (typeof window === 'undefined' && serviceRoleKey)
  ? createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
  : null

const getServerClient = () => (supabaseServer || supabase)

export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await getServerClient().from('registrations').select('id').limit(1)
    if (data !== null || (error && !error.message.includes('fetch failed'))) return true
    console.error('Connection test failed:', error)
    return false
  } catch (e) {
    console.error('Supabase connection test failed:', e)
    return false
  }
}

export const checkRegistrationsTable = async (): Promise<boolean> => {
  try {
    const { error } = await getServerClient().from('registrations').select('id').limit(0)
    return !error || !error.message?.includes('does not exist')
  } catch (e) {
    console.error('Error checking registrations table:', e)
    return false
  }
}

export interface Registration {
  id?: string
  category: 'male' | 'female' | 'kids'
  full_name: string
  parent_name?: string
  mobile_number: string
  age: number
  skillset: string
  bowling_arm: string
  cricket_experience?: string
  cric_heroes_link?: string
  jersey_name: string
  jersey_number: number
  jersey_size: string
  photo_url?: string
  transaction_id?: string
  transaction_screenshot_url?: string
  payment_status: 'pending' | 'completed' | 'failed'
  registration_date?: string
  approved: boolean
  team_assigned?: string
  created_at?: string
  updated_at?: string
}

export const uploadPhoto = async (file: File, registrationId: string): Promise<string | null> => {
  try {
    const client = getServerClient()
    console.log('UPLOAD START', { sr: !!supabaseServer, name: file?.name, size: file?.size, type: file?.type })
    if (!file || file.size === 0) return null
    if (file.size > 10 * 1024 * 1024) return null

    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!ext) return null
    const allowedExt = ['jpg', 'jpeg', 'png', 'heic']
    const allowedMime = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
    if (!allowedExt.includes(ext) && !allowedMime.includes(file.type.toLowerCase())) return null

    let fileName = `${registrationId}-${Date.now()}.${ext}`

    // Best effort bucket visibility check
    try {
      const { data: buckets, error } = await client.storage.listBuckets()
      if (error) console.warn('listBuckets error (ignore if permission):', error.message)
      else console.log('Bucket present:', buckets?.some(b => b.name === 'registration-photos'))
    } catch {}

    const configs = [
      { cacheControl: '3600', upsert: false, contentType: file.type },
      { cacheControl: '3600', upsert: false },
      { cacheControl: '3600', upsert: true, contentType: file.type }
    ]

    let result: any = null
    let lastErr: any = null
    for (let i = 0; i < configs.length; i++) {
      const { data, error } = await client.storage.from('registration-photos').upload(fileName, file, configs[i] as any)
      if (error) {
        lastErr = error
        console.warn('Upload attempt failed', i + 1, error.message)
        if (error.message.includes('exists')) {
          fileName = `${registrationId}-${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`
        }
        continue
      }
      result = data
      break
    }

    if (!result) {
      console.error('Upload failed (all attempts). Last:', { msg: lastErr?.message, status: lastErr?.status })
      return null
    }

    const { data: pub } = client.storage.from('registration-photos').getPublicUrl(result.path)
    if (!pub?.publicUrl) return null
    console.log('UPLOAD OK', pub.publicUrl)
    return pub.publicUrl
  } catch (e) {
    console.error('uploadPhoto unexpected error:', e)
    return null
  }
}

export const createRegistration = async (dataIn: Omit<Registration, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Registration | null, error: any }> => {
  try {
    const client = getServerClient()
    const { data, error } = await client.from('registrations').insert([dataIn]).select().single()
    if (error) console.error('Insert error:', error)
    return { data, error }
  } catch (e) {
    console.error('createRegistration unexpected error:', e)
    return { data: null, error: e }
  }
}

export const getRegistrations = async (): Promise<{ data: Registration[] | null, error: any }> => {
  try {
    const { data, error } = await getServerClient().from('registrations').select('*').order('created_at', { ascending: false })
    return { data, error }
  } catch (e) {
    console.error('getRegistrations error:', e)
    return { data: null, error: e }
  }
}

export const updatePaymentStatus = async (id: string, status: 'pending' | 'completed' | 'failed'): Promise<{ error: any }> => {
  try {
    const { error } = await getServerClient().from('registrations').update({ payment_status: status }).eq('id', id)
    return { error }
  } catch (e) {
    console.error('updatePaymentStatus error:', e)
    return { error: e }
  }
}