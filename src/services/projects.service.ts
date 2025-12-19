//src/services/projects.service.ts
import type { Project } from "../types/api";
import { apiGet, apiPostForm } from "./apiClient";

export type CreateProjectBody = {
  name: string;
  description?: string;
  status?: "draft" | "active" | "paused" | "closed";
  location?: string;
};

export function listProjects() {
  return apiGet<Project[]>("/v1/projects/");
}

export function createProject(body: CreateProjectBody) {
  return apiPostForm<Project>("/v1/projects/", body);
}
