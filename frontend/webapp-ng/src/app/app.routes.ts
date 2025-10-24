import { Routes } from '@angular/router';
import { CatalogListComponent } from './components/catalog-list.component';
import { AiSearchComponent } from './components/ai-search.component';
import { IntegrationsComponent } from './components/integrations.component';

export const routes: Routes = [
  { path: '', component: CatalogListComponent },
  { path: 'ai', component: AiSearchComponent },
  { path: 'integrations', component: IntegrationsComponent },
];
