export interface SearchResult {
  id: string;
  name: string;
  description?: string;
  price: number;
  score: number;
}

export interface APIResponse<T> {
  data: T;
  error?: string;
  status: string;
}

export interface HealthStatus {
  status: string;
  checks: Array<{
    name: string;
    status: string;
    details?: Record<string, unknown>;
  }>;
}