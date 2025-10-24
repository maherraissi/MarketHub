import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiApiService {
  private base = environment.aiBaseUrl;
  
  constructor(private http: HttpClient) {}
  
  health() {
    return this.http.get(`${this.base}/health`);
  }
  
  search(query: string) {
    return this.http.post<any[]>(`${this.base}/search`, { query, topK: 10 });
  }
}
