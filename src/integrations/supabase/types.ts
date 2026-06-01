export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          reflections_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          reflections_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          reflections_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reflections: {
        Row: {
          id: string;
          user_id: string;
          pillar: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pillar: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          pillar?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
