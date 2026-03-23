-- Migration: Create products table in Supabase
-- Run this in Supabase SQL Editor

-- Create products table with UUID primary key
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER DEFAULT 0,
    honest_label TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can read products
CREATE POLICY "products_read_policy" ON products
    FOR SELECT USING (true);

-- Create policy: Only authenticated users can insert/update/delete
CREATE POLICY "products_write_policy" ON products
    FOR ALL USING (auth.role() = 'authenticated');

-- Add updated_at trigger for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
