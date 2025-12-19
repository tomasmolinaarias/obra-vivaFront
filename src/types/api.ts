//src/types/api.ts
export type Me = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  status: "draft" | "active" | "paused" | "closed";
  location: string;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  project: number;
};
