-- Create brands table for "Trusted by" section, admin-managed
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view brands"
ON public.brands FOR SELECT
USING (true);

CREATE POLICY "Admins can insert brands"
ON public.brands FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update brands"
ON public.brands FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete brands"
ON public.brands FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_brands_updated_at
BEFORE UPDATE ON public.brands
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create a public storage bucket for brand logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-logos', 'brand-logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view brand logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'brand-logos');

CREATE POLICY "Admins can upload brand logos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'brand-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update brand logos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'brand-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete brand logos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'brand-logos' AND has_role(auth.uid(), 'admin'::app_role));

-- Seed initial brands
INSERT INTO public.brands (name, display_order) VALUES
  ('Samsung', 1),
  ('LG', 2),
  ('BenQ', 3),
  ('Teachmint', 4),
  ('Aora', 5),
  ('Spectron', 6),
  ('Vutech', 7),
  ('Logic', 8);