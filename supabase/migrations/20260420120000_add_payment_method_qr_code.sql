alter table public.payment_methods
add column if not exists qr_code_url text;
