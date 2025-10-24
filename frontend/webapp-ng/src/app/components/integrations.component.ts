import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IntegrationApiService } from '../services/integration-api.service';

@Component({
  selector: 'app-integrations',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
  <div class="integrations-container">
    <div class="card">
      <h3>🐰 RabbitMQ - Messaging</h3>
      <p class="description">Testez la publication de messages via RabbitMQ</p>
      
      <div class="form-group">
        <label for="rabbitMsg">Message à publier:</label>
        <input 
          id="rabbitMsg"
          [(ngModel)]="rabbitMsg" 
          placeholder="Votre message" 
          [disabled]="rabbitLoading"
          class="form-control"
        />
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" (click)="sendRabbit()" [disabled]="rabbitLoading || !rabbitMsg.trim()">
          {{ rabbitLoading ? '⏳ Publication...' : '📤 Publier' }}
        </button>
        <button class="btn btn-outline-secondary" (click)="refreshLast()" [disabled]="rabbitLoading">
          {{ rabbitLoading ? '⏳ Récupération...' : '🔄 Dernier message' }}
        </button>
      </div>
      
      <div *ngIf="rabbitError" class="error-message alert alert-danger">
        ❌ Erreur RabbitMQ: {{ rabbitError }}
      </div>
      
      <div *ngIf="rabbitSuccess" class="success-message alert alert-success">
        ✅ Message publié avec succès!
      </div>
      
      <div *ngIf="lastRabbit !== null" class="last-message">
        <strong>📨 Dernier message reçu:</strong>
        <div class="message-content">{{ lastRabbit }}</div>
      </div>
    </div>

    <div class="card">
      <h3>📧 Mailhog - Email Testing</h3>
      <p class="description">Testez l'envoi d'emails via Mailhog (serveur de test)</p>
      
      <div class="form-group">
        <label for="mailTo">Destinataire:</label>
        <input 
          id="mailTo"
          [(ngModel)]="mailTo" 
          placeholder="destinataire@example.com" 
          type="email"
          [disabled]="mailLoading"
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="mailSubject">Sujet:</label>
        <input 
          id="mailSubject"
          [(ngModel)]="mailSubject" 
          placeholder="Sujet du message" 
          [disabled]="mailLoading"
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="mailBody">Contenu:</label>
        <textarea 
          id="mailBody"
          [(ngModel)]="mailBody" 
          rows="4" 
          placeholder="Contenu du message"
          [disabled]="mailLoading"
          class="form-control"
        ></textarea>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" (click)="sendMail()" [disabled]="mailLoading || !mailTo.trim() || !mailSubject.trim()">
          {{ mailLoading ? '⏳ Envoi...' : '📧 Envoyer' }}
        </button>
      </div>
      
      <div *ngIf="mailError" class="error-message alert alert-danger">
        ❌ Erreur Email: {{ mailError }}
      </div>
      
      <div *ngIf="mailSuccess" class="success-message alert alert-success">
        ✅ Email envoyé avec succès! Vérifiez Mailhog UI: <a href="http://localhost:8025" target="_blank">http://localhost:8025</a>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .integrations-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }
    
    .description {
      color: #6b7280;
      margin-bottom: 1.5rem;
      font-style: italic;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
      color: #374151;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .actions {
      display: flex;
      gap: 8px;
      margin-bottom: 1rem;
    }
    
    .error-message {
      background: #fef2f2;
      color: #dc2626;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 1rem;
      border: 1px solid #fecaca;
    }
    
    .success-message {
      background: #f0fdf4;
      color: #166534;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 1rem;
      border: 1px solid #bbf7d0;
    }
    
    .success-message a {
      color: #166534;
      text-decoration: underline;
    }
    
    .last-message {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 12px;
      margin-top: 1rem;
    }
    
    .message-content {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 8px;
      margin-top: 8px;
      font-family: monospace;
      font-size: 14px;
    }
  `]
})
export class IntegrationsComponent implements OnInit {
  rabbitMsg = 'Hello Rabbit from MarketHub!';
  lastRabbit: string | null = null;
  rabbitLoading = false;
  rabbitError: string | null = null;
  rabbitSuccess = false;

  mailTo = 'demo@local.test';
  mailSubject = 'Test MarketHub';
  mailBody = 'Bonjour depuis la webapp MarketHub.\n\nCeci est un email de test envoyé via Mailhog.';
  mailLoading = false;
  mailError: string | null = null;
  mailSuccess = false;

  constructor(private api: IntegrationApiService) {}

  ngOnInit() {
    this.refreshLast();
  }

  sendRabbit() {
    if (!this.rabbitMsg.trim() || this.rabbitLoading) return;
    
    this.rabbitLoading = true;
    this.rabbitError = null;
    this.rabbitSuccess = false;
    
    this.api.publishRabbit(this.rabbitMsg).subscribe({
      next: () => {
        this.rabbitSuccess = true;
        this.rabbitLoading = false;
        setTimeout(() => this.rabbitSuccess = false, 3000);
      },
      error: (err) => {
        this.rabbitError = err.message || 'Erreur lors de la publication';
        this.rabbitLoading = false;
      }
    });
  }

  refreshLast() {
    this.rabbitLoading = true;
    this.rabbitError = null;
    
    this.api.getLastRabbit().subscribe({
      next: (r) => {
        this.lastRabbit = r.last;
        this.rabbitLoading = false;
      },
      error: (err) => {
        this.rabbitError = err.message || 'Erreur lors de la récupération';
        this.rabbitLoading = false;
      }
    });
  }

  sendMail() {
    if (!this.mailTo.trim() || !this.mailSubject.trim() || this.mailLoading) return;
    
    this.mailLoading = true;
    this.mailError = null;
    this.mailSuccess = false;
    
    this.api.sendMail(this.mailTo, this.mailSubject, this.mailBody).subscribe({
      next: () => {
        this.mailSuccess = true;
        this.mailLoading = false;
        setTimeout(() => this.mailSuccess = false, 5000);
      },
      error: (err) => {
        this.mailError = err.message || 'Erreur lors de l\'envoi';
        this.mailLoading = false;
      }
    });
  }
}
