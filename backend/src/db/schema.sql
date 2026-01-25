-- Enable UUID extension (still useful for other things)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist to allow schema updates during dev
DROP TABLE IF EXISTS itineraries CASCADE;
DROP TABLE IF EXISTS heritage_sites CASCADE;

-- Heritage Sites Table
CREATE TABLE heritage_sites (
  id VARCHAR(255) PRIMARY KEY, -- Changed from UUID to allow custom IDs
  name VARCHAR(255) NOT NULL,
  location JSONB NOT NULL, -- { lat, lng, city, country }
  category VARCHAR(100) NOT NULL,
  source_id VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'wikidata_Q123', 'osm_456'
  summary TEXT,
  images TEXT[],
  attributes JSONB DEFAULT '{}', -- Flexible attributes (visiting hours, fee, etc.)
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Itineraries Table
CREATE TABLE itineraries (
  id VARCHAR(255) PRIMARY KEY, -- Changed from UUID
  user_session_id VARCHAR(255), -- For anonymous sessions or future auth
  location_name VARCHAR(255) NOT NULL,
  days INTEGER NOT NULL,
  preferences JSONB NOT NULL, -- { categories, pace, startTime, endTime }
  schedule JSONB NOT NULL, -- The full generated schedule structure
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_heritage_sites_location ON heritage_sites USING GIN (location);
CREATE INDEX IF NOT EXISTS idx_itineraries_session ON itineraries(user_session_id);
