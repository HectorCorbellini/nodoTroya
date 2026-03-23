-- Migration: Create productos table in Supabase (español)
-- Run this in Supabase SQL Editor

-- Create productos table with INTEGER primary key (matches static data)
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    categoria TEXT NOT NULL,
    descripcion TEXT,
    precio TEXT,
    stock INTEGER DEFAULT 0,
    imagen_url TEXT,
    honest_label TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can read productos
CREATE POLICY "productos_read_policy" ON productos
    FOR SELECT USING (true);

-- Create policy: Only authenticated users can insert/update/delete
CREATE POLICY "productos_write_policy" ON productos
    FOR ALL USING (auth.role() = 'authenticated');

-- Add updated_at trigger for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index on categoria for faster queries
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
