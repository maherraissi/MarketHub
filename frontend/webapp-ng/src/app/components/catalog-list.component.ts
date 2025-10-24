  import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { CatalogApiService } from '../services/catalog-api.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  template: `
  <div class="card fade-in">
    <h3 class="mb-4">📦 Catalogue des Produits</h3>
    
    <div class="d-flex flex-wrap gap-3 mb-4">
      <button class="btn btn-primary" (click)="reload()" [disabled]="loading">
        <div class="d-flex align-items-center">
          <div *ngIf="loading" class="spinner me-2"></div>
          <span>{{ loading ? 'Chargement...' : '🔄 Recharger' }}</span>
        </div>
      </button>
      
      <button class="btn btn-outline-secondary" (click)="checkHealth()" [disabled]="healthLoading">
        <div class="d-flex align-items-center">
          <div *ngIf="healthLoading" class="spinner me-2"></div>
          <span>{{ healthLoading ? 'Vérification...' : '🏥 Santé API' }}</span>
        </div>
      </button>
    </div>
    
    <div *ngIf="healthStatus" [@slideIn] class="health-status alert" 
         [class.alert-success]="healthStatus === 'UP'" 
         [class.alert-danger]="healthStatus !== 'UP'">
      <i class="bi" [class.bi-check-circle-fill]="healthStatus === 'UP'" 
         [class.bi-exclamation-circle-fill]="healthStatus !== 'UP'"></i>
      Statut API: {{ healthStatus }}
    </div>
    
    <div *ngIf="error" [@slideIn] class="error-message alert alert-danger">
      <i class="bi bi-exclamation-triangle-fill"></i>
      {{ error }}
    </div>
    
    <div *ngIf="products.length > 0" [@listAnimation]="products.length" class="product-grid">
      <div *ngFor="let p of products" class="product-card" [@fadeIn]>
        <div class="product-content">
          <div class="product-header">
            <strong class="product-id">{{p.id}}</strong>
            <span class="badge bg-success price-badge">{{p.price | number:'1.2-2'}} €</span>
          </div>
          <h5 class="product-name">{{p.name}}</h5>
          <p class="product-description" *ngIf="p.description">{{p.description}}</p>
          <div class="product-actions">
            <button class="btn btn-sm btn-outline-primary">
              <i class="bi bi-cart-plus"></i> Ajouter
            </button>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-info-circle"></i> Détails
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="products.length === 0 && !loading" [@fadeIn] class="empty-state">
      <i class="bi bi-inbox"></i>
      <p>Aucun produit trouvé</p>
    </div>
    
    <div *ngIf="loading" [@fadeIn] class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des produits...</p>
    </div>
  </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('300ms', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
  styles: [`
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s;
      border: 1px solid #e5e7eb;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .product-content {
      padding: 1.5rem;
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .product-id {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .product-name {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .product-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .price-badge {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }

    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      gap: 1rem;
      color: #6b7280;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }

    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .empty-state p {
      font-size: 1.125rem;
    }
  `]
})
export class CatalogListComponent implements OnInit {
  products: any[] = [];
  loading = false;
  healthLoading = false;
  healthStatus: string | null = null;
  error: string | null = null;

  constructor(private api: CatalogApiService) {}

  ngOnInit() {
    this.loadProducts();
    this.checkHealth();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    this.api.listProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors du chargement des produits';
        this.products = [];
        this.loading = false;
      }
    });
  }

  reload() {
    this.loadProducts();
  }

  checkHealth() {
    this.healthLoading = true;
    this.api.health().subscribe({
      next: (response: any) => {
        this.healthStatus = response.status || 'UP';
        this.healthLoading = false;
      },
      error: (err) => {
        this.healthStatus = 'DOWN';
        this.healthLoading = false;
        console.error('Health check failed:', err);
      }
    });
  }
}
