import { apiRequest } from "./queryClient";
import type { Resource } from "@shared/schema";

export async function getResources(filters?: {
  category?: string;
  subject?: string;
  semester?: string;
  search?: string;
  sortBy?: string;
}): Promise<Resource[]> {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') params.append(key, value);
    });
  }
  
  const response = await apiRequest("GET", `/api/resources?${params}`);
  return response.json();
}

export async function getFeaturedResources(): Promise<Resource[]> {
  const response = await apiRequest("GET", "/api/resources/featured");
  return response.json();
}

export async function getResourceStats(): Promise<{
  notes: number;
  pyqs: number;
  books: number;
  interviews: number;
}> {
  const response = await apiRequest("GET", "/api/stats");
  return response.json();
}

export async function downloadResource(id: number): Promise<{
  downloadUrl: string;
  filename: string;
  success: boolean;
}> {
  const response = await apiRequest("POST", `/api/resources/${id}/download`);
  return response.json();
}

export async function getResource(id: number): Promise<Resource> {
  const response = await apiRequest("GET", `/api/resources/${id}`);
  return response.json();
}
