import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nbezasdiengnedvdysyf.supabase.co';
const minhaURL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXphc2RpZW5nbmVkdmR5c3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwNTQxOTEsImV4cCI6MTk2MDYzMDE5MX0.fcg9RUrCQqBxgW5GRx6M7gRXjNfl0V3QWJcytRq3QyI';
const supabase = createClient(supabaseUrl, minhaURL);
export default supabase;
