import { Court, TimeSlot, Booking } from './supabase'

export const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Padel Pro Court',
    sport: 'padel',
    location: 'Abdoun, Amman',
    price: 25,
    description: 'Professional padel court with premium glass walls, ideal lighting and air conditioning.',
    image_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
  },
  {
    id: '2',
    name: 'Champions Football Ground',
    sport: 'football',
    location: 'Khalda, Amman',
    price: 40,
    description: 'Full-size 5-a-side artificial turf football ground with floodlights and changing rooms.',
    image_url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
  },
  {
    id: '3',
    name: 'Slam Dunk Basketball',
    sport: 'basketball',
    location: 'Sweifieh, Amman',
    price: 20,
    description: 'Indoor hardwood basketball court with professional hoops and scoreboard.',
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  },
  {
    id: '4',
    name: 'Ace Tennis Club',
    sport: 'tennis',
    location: 'Dabouq, Amman',
    price: 18,
    description: 'Clay tennis court maintained to international standards with seating area.',
    image_url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80',
  },
  {
    id: '5',
    name: 'Aqua Sports Pool',
    sport: 'swimming',
    location: 'Mecca St, Amman',
    price: 15,
    description: 'Olympic-size swimming pool with 8 lanes, heated water and professional timing systems.',
    image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
  },
  {
    id: '6',
    name: 'Shuttle Master Badminton',
    sport: 'badminton',
    location: 'Gardens, Amman',
    price: 12,
    description: 'Indoor air-conditioned badminton court with professional flooring and shuttle service.',
    image_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
  },
]

const today = new Date()
const formatDate = (offset: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offset)
  return d.toISOString().split('T')[0]
}

export const mockTimeSlots: TimeSlot[] = []

const timeRanges = [
  { start: '06:00', end: '07:00' },
  { start: '07:00', end: '08:00' },
  { start: '08:00', end: '09:00' },
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:00', end: '17:00' },
  { start: '17:00', end: '18:00' },
  { start: '18:00', end: '19:00' },
  { start: '19:00', end: '20:00' },
  { start: '20:00', end: '21:00' },
  { start: '21:00', end: '22:00' },
]

let slotId = 1
mockCourts.forEach((court) => {
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = formatDate(dayOffset)
    timeRanges.forEach((range, idx) => {
      mockTimeSlots.push({
        id: String(slotId++),
        court_id: court.id,
        date,
        start_time: range.start,
        end_time: range.end,
        is_booked: Math.random() < 0.3,
      })
    })
  }
})

export const mockBookings: Booking[] = [
  {
    id: 'bk-001',
    timeslot_id: '1',
    user_name: 'Ahmed Al-Rashid',
    user_whatsapp: '+962791234567',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  },
  {
    id: 'bk-002',
    timeslot_id: '15',
    user_name: 'Sara Khalil',
    user_whatsapp: '+962797654321',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  },
  {
    id: 'bk-003',
    timeslot_id: '29',
    user_name: 'Omar Naser',
    user_whatsapp: '+962795551234',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
]
