export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      public_requests: { Row:{id:string;request_type:"contact"|"participation"|"media"|"fair_match";email:string;payload:Json;status:"new"|"reviewed";dedupe_key:string;created_at:string}; Insert:{request_type:"contact"|"participation"|"media"|"fair_match";email:string;payload:Json;dedupe_key:string;status?:"new"|"reviewed"}; Update:Partial<{status:"new"|"reviewed"}>; Relationships: []; };
      request_notification_outbox: { Row:{id:number;request_id:string;status:"pending"|"sent"|"failed";attempts:number;last_error:string|null;sent_at:string|null;created_at:string}; Insert:{request_id:string;status?:"pending"|"sent"|"failed";attempts?:number;last_error?:string|null;sent_at?:string|null}; Update:Partial<{status:"pending"|"sent"|"failed";attempts:number;last_error:string|null;sent_at:string|null}>; Relationships: []; };
      floor_plan_assets: { Row:{id:"current";storage_path:string;content_type:string;original_name:string;updated_by:string|null;updated_at:string}; Insert:{id:"current";storage_path:string;content_type:string;original_name:string;updated_by:string;updated_at?:string}; Update:Partial<{storage_path:string;content_type:string;original_name:string;updated_by:string|null;updated_at:string}>; Relationships: []; };
      exhibitors: { Row:{id:string;name:string;slug:string;category:string;description:string;website_url:string|null;is_active:boolean;is_featured:boolean;display_order:number;created_at:string;updated_at:string}; Insert:Partial<{name:string;slug:string;category:string;description:string;website_url:string|null;is_active:boolean;is_featured:boolean;display_order:number}>; Update:Partial<{name:string;slug:string;category:string;description:string;website_url:string|null;is_active:boolean;is_featured:boolean;display_order:number}>; Relationships: []; };
      event_editions: { Row: { id:string; title:string; starts_on:string; ends_on:string; opens_at:string; closes_at:string; venue:string; city:string; address:string; description:string; visitor_information:string; ticket_url:string|null; publication_status:"draft"|"published"; created_at:string; updated_at:string }; Insert: Partial<{id:string;title:string;starts_on:string;ends_on:string;opens_at:string;closes_at:string;venue:string;city:string;address:string;description:string;visitor_information:string;ticket_url:string|null;publication_status:"draft"|"published"}>; Update: Partial<{title:string;starts_on:string;ends_on:string;opens_at:string;closes_at:string;venue:string;city:string;address:string;description:string;visitor_information:string;ticket_url:string|null;publication_status:"draft"|"published"}>; Relationships: []; };
      event_audit_events: { Row: { id:number; actor_user_id:string; action:"updated"|"published"|"unpublished"; created_at:string }; Insert:{actor_user_id:string;action:"updated"|"published"|"unpublished"}; Update: never; Relationships: []; };
      staff_profiles: {
        Row: {
          created_at: string;
          display_name: string;
          is_active: boolean;
          role: Database["public"]["Enums"]["staff_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          display_name: string;
          is_active?: boolean;
          role: Database["public"]["Enums"]["staff_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          display_name?: string;
          is_active?: boolean;
          role?: Database["public"]["Enums"]["staff_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      staff_account_events: {
        Row: {
          action: "created" | "role_changed" | "deactivated" | "reactivated";
          actor_user_id: string;
          created_at: string;
          id: number;
          target_user_id: string;
        };
        Insert: {
          action: "created" | "role_changed" | "deactivated" | "reactivated";
          actor_user_id: string;
          created_at?: string;
          id?: number;
          target_user_id: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      take_request_rate_limit: {
        Args: {
          p_key_hash: string;
          p_now?: string;
          p_window_seconds?: number;
          p_maximum_requests?: number;
        };
        Returns: Array<{
          allowed: boolean;
          retry_after_seconds: number;
        }>;
      };
    };
    Enums: {
      staff_role: "administrator" | "staff" | "organizer";
    };
    CompositeTypes: Record<never, never>;
  };
};
