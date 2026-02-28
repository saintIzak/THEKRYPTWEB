/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          price: number;
          image_url: string;
          images: string[];
          description: string;
          rating: number;
          in_stock: boolean;
          is_tested: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          price: number;
          image_url: string;
          images?: string[];
          description: string;
          rating?: number;
          in_stock?: boolean;
          is_tested?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          price?: number;
          image_url?: string;
          images?: string[];
          description?: string;
          rating?: number;
          in_stock?: boolean;
          is_tested?: boolean;
          updated_at?: string;
        };
      };
    };
  };
}