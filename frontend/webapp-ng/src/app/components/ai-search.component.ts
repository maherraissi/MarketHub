import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { AiApiService } from '../services/ai-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { SearchResult, APIResponse, HealthStatus } from '../models/types';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ai-search',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DecimalPipe],
  template: `
  <div class="card fade-in">
    <header class="search-header">
      <h3>🤖 Recherche Intelligente avec IA</h3>
      <p class="text-muted">Trouvez les produits dont vous avez besoin avec notre IA</p>
    </header>
    
    <div class="search-section" [@slideIn]>
      <div class="search-bar">
        <div class="input-group">
          <div class="input-icon">
            <i class="bi bi-search"></i>
          </div>
          <input 
            [(ngModel)]="q" 
            placeholder="Rechercher des produits (ex: vis inox, perceuse, outillage...)" 
            (keyup.enter)="doSearch()"
            [disabled]="searching"
            class="form-control"
            [class.is-searching]="searching"
          />
          <button 
            class="btn btn-primary search-button" 
            (click)="doSearch()" 
            [disabled]="searching || !q.trim()"
          >
            <div class="d-flex align-items-center">
              <div *ngIf="searching" class="spinner me-2"></div>
              <span>{{ searching ? 'Recherche...' : 'Rechercher' }}</span>
            </div>
          </button>
        </div>
        
        <div class="suggestions-wrapper" [@slideIn]>
          <span class="suggestion-label">Suggestions populaires:</span>
          <div class="suggestions">
            <button 
              *ngFor="let suggestion of suggestions" 
              (click)="q = suggestion; doSearch()"
              class="suggestion-chip"
              [disabled]="searching"
              [@fadeIn]
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="healthStatus" [@slideIn] class="health-status alert" 
         [class.alert-success]="healthStatus === 'UP'" 
         [class.alert-danger]="healthStatus !== 'UP'">
      <i class="bi" [class.bi-check-circle-fill]="healthStatus === 'UP'" 
         [class.bi-exclamation-circle-fill]="healthStatus !== 'UP'"></i>
      <span>IA Status: {{ healthStatus }}</span>
    </div>
    
    <div *ngIf="error" [@slideIn] class="error-message alert alert-danger">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <span>{{ error }}</span>
    </div>
    
    <div *ngIf="results.length > 0" class="results-container" [@resultsAnimation]="results.length">
      <div class="results-header">
        <h4>
          <i class="bi bi-bullseye"></i>
          Résultats ({{ results.length }})
        </h4>
        <div class="results-actions">
          <button class="btn btn-outline-secondary btn-sm" (click)="sortResults('score')">
            <i class="bi bi-sort-down"></i> Par pertinence
          </button>
          <button class="btn btn-outline-secondary btn-sm" (click)="sortResults('price')">
            <i class="bi bi-sort-numeric-down"></i> Par prix
          </button>
        </div>
      </div>
      
      <div class="results-grid">
        <div *ngFor="let r of results" class="result-card" [@fadeIn]>
          <div class="result-content">
            <div class="result-header">
              <div class="result-id">{{ r.id }}</div>
              <div class="result-score" [style.background-color]="getScoreColor(r.score)">
                {{ (r.score * 100) | number:'1.0-0' }}%
              </div>
            </div>
            
            <h5 class="result-name">{{ r.name }}</h5>
            <p class="result-description">{{ r.description }}</p>
            
            <div class="result-footer">
              <div class="price">{{ r.price | number:'1.2-2' }} €</div>
              <div class="actions">
                <button class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-cart-plus"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="bi bi-info-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="!searching && results.length === 0 && hasSearched" 
         class="empty-state" [@fadeIn]>
      <i class="bi bi-search"></i>
      <p>Aucun résultat trouvé pour "{{ lastQuery }}"</p>
      <button class="btn btn-outline-primary" (click)="q = ''; results = []">
        <i class="bi bi-arrow-counterclockwise"></i> Nouvelle recherche
      </button>
    </div>
  </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('resultsAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  styles: [`
    .search-header {
      margin-bottom: 2rem;
      text-align: center;
    }
    .search-header h3 {
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }
    
    .search-section {
      margin-bottom: 2rem;
    }
    
    .search-bar {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .input-group {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      position: relative;
    }
    
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }
    
    .input-group input {
      flex: 1;
      padding: 1rem 1rem 1rem 2.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.2s;
    }
    .input-group input.is-searching {
      background: #f9fafb;
    }
    
    .suggestions-wrapper {
      text-align: center;
      margin-top: 1rem;
    }
    
    .suggestion-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #6b7280;
      font-size: 0.875rem;
    }
    
    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }
    
    .suggestion-chip {
      padding: 0.5rem 1rem;
      background: #f3f4f6;
      border: none;
      border-radius: 20px;
      color: #4b5563;
      font-size: 0.875rem;
      transition: all 0.2s;
      cursor: pointer;
    }
    .suggestion-chip:hover:not(:disabled) {
      background: #e5e7eb;
      transform: translateY(-1px);
    }
    .suggestion-chip:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .results-container {
      margin-top: 2rem;
    }
    
    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .results-header h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }
    .results-header h4 i {
      color: #3b82f6;
    }
    
    .results-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .result-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s;
      border: 1px solid #e5e7eb;
    }
    .result-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .result-content {
      padding: 1.5rem;
    }
    
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .result-id {
      color: #6b7280;
      font-size: 0.875rem;
    }
    
    .result-score {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .result-name {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #111827;
    }
    
    .result-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    .result-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .price {
      font-size: 1.25rem;
      font-weight: 600;
      color: #059669;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem 1.5rem;
      color: #6b7280;
    }
    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #9ca3af;
    }
    .empty-state p {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }
    
    .suggestion-label {
      font-weight: 500;
      color: #6b7280;
      margin-right: 8px;
    }
    
    .suggestion-btn {
      padding: 4px 12px;
      font-size: 14px;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .suggestion-btn:hover {
      background: #e5e7eb;
    }
    
    .health-status {
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .health-status.healthy {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    
    .health-status.unhealthy {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
    
    .error-message {
      background: #fef2f2;
      color: #dc2626;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 1rem;
      border: 1px solid #fecaca;
    }
    
    .results-section h4 {
      margin: 1.5rem 0 1rem 0;
      color: #374151;
    }
    
    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    
    .result-item {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      background: #f9fafb;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .result-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .score {
      padding: 4px 8px;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      font-size: 12px;
    }
    
    .result-name {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }
    
    .result-description {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .result-price {
      color: #059669;
      font-weight: 600;
      font-size: 16px;
    }
    
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
      font-style: italic;
    }
  `]
})
export class AiSearchComponent implements OnInit {
  q = 'vis inox';
  results: any[] = [];
  searching = false;
  healthStatus: string | null = null;
  error: string | null = null;
  hasSearched = false;
  lastQuery = '';
  
  suggestions = [
    'vis inox',
    'perceuse sans fil',
    'outillage électroportatif',
    'clé à molette',
    'tournevis'
  ];

  constructor(private ai: AiApiService) {}

  ngOnInit() {
    this.checkHealth();
  }

  doSearch() {
    if (!this.q.trim() || this.searching) return;
    
    this.searching = true;
    this.error = null;
    this.lastQuery = this.q;
    this.hasSearched = true;
    
    this.ai.search(this.q).subscribe({
      next: (r) => {
        this.results = r;
        this.searching = false;
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors de la recherche';
        this.results = [];
        this.searching = false;
      }
    });
  }

  checkHealth() {
    this.ai.health().subscribe({
      next: (response: any) => {
        this.healthStatus = response.status || 'UP';
      },
      error: (err) => {
        this.healthStatus = 'DOWN';
        console.error('AI Health check failed:', err);
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 0.8) return '#10b981'; // vert
    if (score >= 0.6) return '#f59e0b'; // orange
    return '#ef4444'; // rouge
  }

  sortResults(by: 'score' | 'price') {
    if (!this.results?.length) return;
    const copy = [...this.results];
    if (by === 'score') {
      copy.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    } else {
      copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }
    this.results = copy;
  }
}
