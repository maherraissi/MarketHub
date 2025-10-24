import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogApiService {
  private base = environment.catalogBaseUrl;
  
  constructor(private http: HttpClient) {}
  
  listProducts() {
    return this.http.get<any[]>(`${this.base}/products`);
  }
  
  health() {
    return this.http.get(`${this.base}/health`);
  }
}
