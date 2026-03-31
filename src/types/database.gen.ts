export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: Json | null
          id: string
          image_url: string | null
          is_active: boolean
          name: Json
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      admission_steps: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: Json | null
          icon: string | null
          id: string
          is_active: boolean
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          icon?: string | null
          id?: string
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          icon?: string | null
          id?: string
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: Json
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          resource: string
          resource_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          resource: string
          resource_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          resource?: string
          resource_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          author_role: string | null
          content: Json | null
          created_at: string
          date: string
          deleted_at: string | null
          excerpt: Json | null
          id: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at: string
        }
        Insert: {
          author?: string | null
          author_role?: string | null
          content?: Json | null
          created_at?: string
          date: string
          deleted_at?: string | null
          excerpt?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at?: string
        }
        Update: {
          author?: string | null
          author_role?: string | null
          content?: Json | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          excerpt?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: Json
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          description: Json | null
          id: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          time: string | null
          title: Json
          updated_at: string
          venue: Json | null
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          description?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          time?: string | null
          title: Json
          updated_at?: string
          venue?: Json | null
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          description?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          time?: string | null
          title?: Json
          updated_at?: string
          venue?: Json | null
        }
        Relationships: []
      }
      facilities: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: Json | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: Json
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: Json | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: Json
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          question: Json
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          answer: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          question: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          answer?: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          question?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      gallery_events: {
        Row: {
          cover_url: string | null
          created_at: string
          date: string
          deleted_at: string | null
          id: string
          is_active: boolean
          name: Json
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          date: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          name: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          name?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          caption: Json | null
          created_at: string
          gallery_event_id: string
          id: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          caption?: Json | null
          created_at?: string
          gallery_event_id: string
          id?: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          caption?: Json | null
          created_at?: string
          gallery_event_id?: string
          id?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_photos_gallery_event_id_fkey"
            columns: ["gallery_event_id"]
            isOneToOne: false
            referencedRelation: "gallery_events"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_videos: {
        Row: {
          created_at: string
          gallery_event_id: string
          id: string
          sort_order: number
          thumbnail_url: string | null
          title: Json | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          gallery_event_id: string
          id?: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: Json | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          gallery_event_id?: string
          id?: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: Json | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_videos_gallery_event_id_fkey"
            columns: ["gallery_event_id"]
            isOneToOne: false
            referencedRelation: "gallery_events"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: Json | null
          deleted_at: string | null
          heading: Json
          id: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          subheading: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: Json | null
          deleted_at?: string | null
          heading: Json
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subheading?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: Json | null
          deleted_at?: string | null
          heading?: Json
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subheading?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string
          deleted_at: string | null
          href: string
          id: string
          is_active: boolean
          label: Json
          parent_id: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          href: string
          id?: string
          is_active?: boolean
          label: Json
          parent_id?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          href?: string
          id?: string
          is_active?: boolean
          label?: Json
          parent_id?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          category: string | null
          content: Json | null
          created_at: string
          date: string
          deleted_at: string | null
          excerpt: Json | null
          id: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: Json | null
          created_at?: string
          date: string
          deleted_at?: string | null
          excerpt?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: Json | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          excerpt?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: Json
          updated_at?: string
        }
        Relationships: []
      }
      notices: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          excerpt: Json | null
          id: string
          is_active: boolean
          pdf_url: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          excerpt?: Json | null
          id?: string
          is_active?: boolean
          pdf_url?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          excerpt?: Json | null
          id?: string
          is_active?: boolean
          pdf_url?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: Json
          updated_at?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          color: string | null
          created_at: string
          deleted_at: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: Json
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          steps: Json | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          steps?: Json | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          steps?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      principal_message: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          message: Json | null
          name: Json
          photo_url: string | null
          signature_url: string | null
          status: Database["public"]["Enums"]["content_status"]
          title: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          message?: Json | null
          name: Json
          photo_url?: string | null
          signature_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          message?: Json | null
          name?: Json
          photo_url?: string | null
          signature_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      publish_log: {
        Row: {
          details: Json | null
          id: string
          items_count: number
          published_at: string
          user_id: string | null
        }
        Insert: {
          details?: Json | null
          id?: string
          items_count?: number
          published_at?: string
          user_id?: string | null
        }
        Update: {
          details?: Json | null
          id?: string
          items_count?: number
          published_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      site_config: {
        Row: {
          address: Json | null
          created_at: string
          currency: string | null
          default_language: string | null
          deleted_at: string | null
          emails: string[] | null
          established_year: number | null
          footer: Json | null
          google_maps_embed: string | null
          hero_accent_text: Json | null
          id: string
          is_active: boolean
          languages: string[] | null
          logo_url: string | null
          office_hours: Json | null
          page_descriptions: Json | null
          phones: string[] | null
          school_name: Json
          section_subtitles: Json | null
          seo: Json | null
          social_links: Json | null
          stats: Json | null
          status: Database["public"]["Enums"]["content_status"]
          tagline: Json | null
          theme: Json | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          created_at?: string
          currency?: string | null
          default_language?: string | null
          deleted_at?: string | null
          emails?: string[] | null
          established_year?: number | null
          footer?: Json | null
          google_maps_embed?: string | null
          hero_accent_text?: Json | null
          id?: string
          is_active?: boolean
          languages?: string[] | null
          logo_url?: string | null
          office_hours?: Json | null
          page_descriptions?: Json | null
          phones?: string[] | null
          school_name: Json
          section_subtitles?: Json | null
          seo?: Json | null
          social_links?: Json | null
          stats?: Json | null
          status?: Database["public"]["Enums"]["content_status"]
          tagline?: Json | null
          theme?: Json | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          created_at?: string
          currency?: string | null
          default_language?: string | null
          deleted_at?: string | null
          emails?: string[] | null
          established_year?: number | null
          footer?: Json | null
          google_maps_embed?: string | null
          hero_accent_text?: Json | null
          id?: string
          is_active?: boolean
          languages?: string[] | null
          logo_url?: string | null
          office_hours?: Json | null
          page_descriptions?: Json | null
          phones?: string[] | null
          school_name?: Json
          section_subtitles?: Json | null
          seo?: Json | null
          social_links?: Json | null
          stats?: Json | null
          status?: Database["public"]["Enums"]["content_status"]
          tagline?: Json | null
          theme?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          deleted_at: string | null
          department: string
          designation: string
          email: string | null
          id: string
          is_active: boolean
          name: string
          photo_url: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          department: string
          designation: string
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          photo_url?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          department?: string
          designation?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          photo_url?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: Json
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          photo_url: string | null
          quote: Json
          role: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          author_name: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          photo_url?: string | null
          quote: Json
          role?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          author_name?: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          photo_url?: string | null
          quote?: Json
          role?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_draft_count: { Args: never; Returns: number }
      publish_all_drafts: { Args: { p_user_id: string }; Returns: number }
    }
    Enums: {
      content_status: "draft" | "published"
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      content_status: ["draft", "published"],
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const

