// Database Types for Golden Sungava Homepage
// Thin alias layer over auto-generated types from database.gen.ts
// Run `pnpm db:gen:types` to regenerate the source of truth.

// Import from database.gen.ts once schema is defined and types are generated:
// import type { Tables, Enums } from './database.gen';

// --- Base entity utility ---
export interface BaseEntity {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

// Add table type aliases here after defining schema and running db:gen:types
