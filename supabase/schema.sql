-- La3ebeh Arena — لعيبة أرينا
-- Supabase Schema + Seed Data

-- ========================================
-- TABLES
-- ========================================

-- Courts table
CREATE TABLE IF NOT EXISTS courts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sport TEXT NOT NULL CHECK (sport IN ('padel','football','basketball','tennis','swimming','badminton')),
  location TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time slots table
CREATE TABLE IF NOT EXISTS timeslots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  court_id UUID NOT NULL REFERENCES courts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timeslot_id UUID NOT NULL REFERENCES timeslots(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_whatsapp TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','pending','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- INDEXES
-- ========================================

CREATE INDEX IF NOT EXISTS idx_timeslots_court_date ON timeslots(court_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_timeslot ON bookings(timeslot_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

ALTER TABLE courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeslots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Public read access for courts and timeslots
CREATE POLICY "Public read courts" ON courts FOR SELECT USING (true);
CREATE POLICY "Public read timeslots" ON timeslots FOR SELECT USING (true);

-- Public insert for bookings (anyone can book)
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Public read/insert for waitlist
CREATE POLICY "Public read waitlist" ON waitlist FOR SELECT USING (true);
CREATE POLICY "Public insert waitlist" ON waitlist FOR INSERT WITH CHECK (true);

-- Update timeslot to booked after booking
CREATE POLICY "Public update timeslots" ON timeslots FOR UPDATE USING (true);

-- ========================================
-- SEED DATA: 6 COURTS
-- ========================================

INSERT INTO courts (id, name, sport, location, price, description, image_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Padel Pro Court', 'padel', 'Abdoun, Amman', 25.00,
   'Professional padel court with premium glass walls, ideal lighting and air conditioning.',
   'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80'),

  ('22222222-2222-2222-2222-222222222222', 'Champions Football Ground', 'football', 'Khalda, Amman', 40.00,
   'Full-size 5-a-side artificial turf football ground with floodlights and changing rooms.',
   'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80'),

  ('33333333-3333-3333-3333-333333333333', 'Slam Dunk Basketball', 'basketball', 'Sweifieh, Amman', 20.00,
   'Indoor hardwood basketball court with professional hoops and scoreboard.',
   'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'),

  ('44444444-4444-4444-4444-444444444444', 'Ace Tennis Club', 'tennis', 'Dabouq, Amman', 18.00,
   'Clay tennis court maintained to international standards with seating area.',
   'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80'),

  ('55555555-5555-5555-5555-555555555555', 'Aqua Sports Pool', 'swimming', 'Mecca St, Amman', 15.00,
   'Olympic-size swimming pool with 8 lanes, heated water and professional timing systems.',
   'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80'),

  ('66666666-6666-6666-6666-666666666666', 'Shuttle Master Badminton', 'badminton', 'Gardens, Amman', 12.00,
   'Indoor air-conditioned badminton court with professional flooring and shuttle service.',
   'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80')

ON CONFLICT (id) DO NOTHING;

-- ========================================
-- SEED TIMESLOTS (next 7 days for each court)
-- ========================================

-- Helper function to generate slots
DO $$
DECLARE
  court_uuid UUID;
  slot_date DATE;
  time_slots TEXT[][] := ARRAY[
    ARRAY['06:00', '07:00'], ARRAY['07:00', '08:00'], ARRAY['08:00', '09:00'],
    ARRAY['09:00', '10:00'], ARRAY['10:00', '11:00'], ARRAY['11:00', '12:00'],
    ARRAY['14:00', '15:00'], ARRAY['15:00', '16:00'], ARRAY['16:00', '17:00'],
    ARRAY['17:00', '18:00'], ARRAY['18:00', '19:00'], ARRAY['19:00', '20:00'],
    ARRAY['20:00', '21:00'], ARRAY['21:00', '22:00']
  ];
  slot_pair TEXT[];
  is_booked_val BOOLEAN;
BEGIN
  FOR court_uuid IN
    SELECT id FROM courts
  LOOP
    FOR day_offset IN 0..6 LOOP
      slot_date := CURRENT_DATE + day_offset;
      FOREACH slot_pair SLICE 1 IN ARRAY time_slots LOOP
        is_booked_val := (random() < 0.3);
        INSERT INTO timeslots (court_id, date, start_time, end_time, is_booked)
        VALUES (court_uuid, slot_date, slot_pair[1]::TIME, slot_pair[2]::TIME, is_booked_val)
        ON CONFLICT DO NOTHING;
      END LOOP;
    END LOOP;
  END LOOP;
END $$;

-- ========================================
-- SEED BOOKINGS (sample data)
-- ========================================

INSERT INTO bookings (timeslot_id, user_name, user_whatsapp, status)
SELECT
  t.id,
  names.name,
  phones.phone,
  statuses.status
FROM (
  SELECT id, ROW_NUMBER() OVER () AS rn
  FROM timeslots
  WHERE is_booked = TRUE
  LIMIT 10
) t
CROSS JOIN (VALUES
  (1, 'Ahmed Al-Rashid'), (2, 'Sara Khalil'), (3, 'Omar Naser'),
  (4, 'Lana Abukhait'), (5, 'Mohammad Zidan'), (6, 'Hana Mansour'),
  (7, 'Kareem Taha'), (8, 'Nour Saleh'), (9, 'Rami Khalaf'), (10, 'Dina Barakat')
) AS names(n, name)
CROSS JOIN (VALUES
  (1, '+962791234567'), (2, '+962797654321'), (3, '+962795551234'),
  (4, '+962790001234'), (5, '+962798765432'), (6, '+962792345678'),
  (7, '+962793456789'), (8, '+962794567890'), (9, '+962799988776'), (10, '+962796655443')
) AS phones(n, phone)
CROSS JOIN (VALUES
  (1, 'confirmed'), (2, 'confirmed'), (3, 'pending'),
  (4, 'confirmed'), (5, 'confirmed'), (6, 'cancelled'),
  (7, 'confirmed'), (8, 'pending'), (9, 'confirmed'), (10, 'confirmed')
) AS statuses(n, status)
WHERE t.rn = names.n AND t.rn = phones.n AND t.rn = statuses.n
ON CONFLICT DO NOTHING;

-- ========================================
-- SEED WAITLIST
-- ========================================

INSERT INTO waitlist (name, whatsapp) VALUES
  ('Mohammad Al-Khatib', '+962790000001'),
  ('Lana Abukhait', '+962790000002'),
  ('Kareem Zidan', '+962790000003'),
  ('Nour Mansour', '+962790000004'),
  ('Hana Taha', '+962790000005'),
  ('Rami Barakat', '+962790000006'),
  ('Dina Khalaf', '+962790000007')
ON CONFLICT DO NOTHING;
