import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="app-container">
    <header>
      <h1>🛒 MarketHub</h1>
      <p>Plateforme de gestion de catalogue avec IA</p>
      <button class="cta-btn" routerLink="/ai">🚀 Essayez la recherche IA</button>
    </header>
    <nav class="mb-3">
      <ul class="nav nav-pills justify-content-center gap-2">
        <li class="nav-item">
          <a class="nav-link" routerLink="/" [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact: true}">📦 Produits</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/ai" routerLinkActive="active">🤖 Recherche IA</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/integrations" routerLinkActive="active">🔗 Intégrations</a>
        </li>
      </ul>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <footer>
      <p>&copy; 2024 MarketHub - Démo technique</p>
    </footer>
  </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    header {
      text-align: center;
      padding: 2rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin: -16px -16px 2rem -16px;
    }
    
    header h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
    }
    
    header p {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 1.1rem;
    }
    
    nav {
      text-align: center;
      margin-bottom: 2rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    nav button {
      margin: 0 8px;
      padding: 8px 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #f9fafb;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    nav button:hover {
      background: #e5e7eb;
    }
    
    nav button.active {
      background: #1e40af;
      color: white;
      border-color: #1e40af;
    }
    
    main {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      padding: 0 16px;
    }
    
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      margin: 16px 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .card h3 {
      margin-top: 0;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
    }
    
    input {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      margin: 4px;
      width: 200px;
    }
    
    button {
      padding: 10px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      cursor: pointer;
      background: #f9fafb;
      color: #374151;
      font-weight: 500;
      transition: all 0.2s;
      margin: 4px;
    }
    
    button:hover {
      background: #e5e7eb;
    }
    
    .results {
      margin-top: 1rem;
    }
    
    .result-item {
      padding: 8px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    
    .integration-section {
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    
    .status {
      margin-top: 1rem;
      padding: 8px 12px;
      border-radius: 6px;
      font-weight: 500;
    }
    
    .status.success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    
    .status.error {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
    
    footer {
      text-align: center;
      padding: 2rem;
      margin-top: 2rem;
      background: #f8fafc;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
    }
  `]
})
export class AppComponent {
  // Le contenu est géré par les composants de routing
}
