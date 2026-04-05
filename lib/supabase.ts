import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Court = {
  id: string
  name: string
  sport: string
  location: string
  price: number
  description: string
  image_url?: string
}

export type TimeSlot = {
  id: string
  court_id: string
  date: string
  start_time: string
  end_time: string
  is_booked: boolean
}

export type Booking = {
  id: string
  timeslot_id: string
  user_name: string
  user_whatsapp: string
  status: string
  created_at: string
}

export type WaitlistEntry = {
  id: string
  name: string
  whatsapp: string
  created_at: string
}
