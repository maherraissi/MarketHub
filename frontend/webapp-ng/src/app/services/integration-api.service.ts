import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IntegrationApiService {
  private base = environment.catalogBaseUrl;
  
  constructor(private http: HttpClient) {}

  publishRabbit(message: string) {
    return this.http.post(`${this.base}/integrations/rabbit`, { message });
  }

  getLastRabbit() {
    return this.http.get<{last: string}>(`${this.base}/integrations/rabbit/last`);
  }

  sendMail(to: string, subject: string, body: string) {
    return this.http.post(`${this.base}/integrations/mail`, { to, subject, body });
  }
}
