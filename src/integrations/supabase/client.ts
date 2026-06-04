import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://mndfzkuvmpzuqawhrhiu.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZGZ6a3V2bXB6dXFhd2hyaGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODIzMjQsImV4cCI6MjA5NjE1ODMyNH0.e8E5Xm1SffGIz1cL_r6_FveR6J30grfhI7_jFDZfCpk";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
