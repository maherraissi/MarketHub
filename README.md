# 🛒 MarketHub

Plateforme de gestion de catalogue avec IA - Démo technique complète.

## 🚀 Démarrage Rapide

### Option 1: Script de Démarrage Automatique (Recommandé)

1. **Démarrage complet en un clic:**
   ```cmd
   start.bat
   ```
   Ce script vérifie les ports, démarre l'AI Service et le Frontend automatiquement.

2. **Démarrage individuel (si nécessaire):**
   ```cmd
   # Frontend Angular uniquement
   start-frontend.bat
   
   # AI Service uniquement  
   start-ai-service.bat
   
   # Démarrage intelligent avec détection de ports
   start-smart.bat
   ```

3. **Accéder à l'application:**
   - 🌐 **Frontend:** http://localhost:4200
   - 🤖 **AI Service:** http://localhost:8086/ai/health
   - 📊 **Swagger AI:** http://localhost:8086/docs

### Option 2: Docker Compose (Stack complet)

1. **Prérequis:** Docker Desktop installé et démarré
2. **Lancer tous les services:**
   ```powershell
   cd infra\docker
   docker compose up -d --build
   ```
3. **Accéder aux services:**
   - 🌐 **Webapp:** http://localhost:4200
   - 📦 **Catalog Service:** http://localhost:8081/api/catalog/health
   - 🤖 **AI Service:** http://localhost:8086/ai/health
   - 📊 **Swagger (catalog):** http://localhost:8081/swagger-ui/index.html
   - 🐰 **RabbitMQ UI:** http://localhost:15672 (guest/guest)
   - 🔐 **Keycloak:** http://localhost:8082 (admin/admin)
   - 📧 **Mailhog UI:** http://localhost:8025
   - 📈 **Prometheus:** http://localhost:9090
   - 📊 **Grafana:** http://localhost:3000

4. **Arrêt:**
   ```powershell
   docker compose down
   ```

## 🛠️ Développement Local

### Frontend (Angular 17)
```bash
cd frontend/webapp-ng
npm install
npm start
```

### AI Service (FastAPI)
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8086
```

### Backend (Spring Boot)
```bash
cd backend/services/catalog-service
mvn spring-boot:run
```

## ✨ Fonctionnalités

### 🎯 Frontend Angular
- **Interface moderne** avec design responsive
- **Navigation intuitive** entre les sections
- **Gestion d'erreurs** et états de chargement
- **Recherche IA** avec suggestions
- **Tests d'intégrations** (RabbitMQ, Mailhog)

### 🤖 AI Service (FastAPI)
- **Recherche sémantique** de produits
- **API REST** avec documentation Swagger
- **CORS configuré** pour le frontend
- **Réponses simulées** pour démonstration

### 🔗 Intégrations
- **RabbitMQ** pour la messagerie
- **Mailhog** pour les tests d'email
- **PostgreSQL** pour la persistance
- **Keycloak** pour l'authentification
- **Prometheus/Grafana** pour le monitoring

## 📁 Structure du Projet

```
MarketHub/
├── frontend/
│   ├── webapp-ng/          # Application Angular 17
│   └── webapp/             # Version statique
├── backend/
│   └── services/
│       └── catalog-service/ # Service Spring Boot
├── ai-service/             # Service FastAPI
├── infra/
│   ├── docker/             # Configuration Docker
│   └── helm/               # Déploiement Kubernetes
├── start-*.bat             # Scripts de démarrage Windows
└── README.md
```

## 🎨 Interface Utilisateur

L'application propose une interface moderne avec :
- **Header avec gradient** et navigation
- **Cards responsives** pour chaque section
- **États de chargement** et messages d'erreur
- **Design cohérent** avec Tailwind-like styles
- **Icônes emoji** pour une meilleure UX

## 🔧 Configuration

### Variables d'environnement
- **Développement:** `src/environments/environment.ts`
- **Production:** `src/environments/environment.prod.ts`

### URLs par défaut
- Catalog Service: `http://localhost:8081`
- AI Service: `http://localhost:8086`

## 🚀 Déploiement

### Production avec Docker
```bash
cd infra/docker
docker compose -f compose.yaml -f compose.prod.yaml up -d
```

### Kubernetes avec Helm
```bash
cd infra/helm
helm install markethub ./markethub
```

## 📝 Notes de Développement

- Le projet utilise **Angular 17** avec des composants standalone
- **FastAPI** pour l'API IA avec Pydantic pour la validation
- **Spring Boot** pour le service de catalogue
- **Docker Compose** pour l'orchestration des services
- **Scripts Windows** pour faciliter le développement local

## 🔧 Dépannage

### Problèmes Courants
- **Port occupé:** Utilisez `check-ports.bat` ou `start-smart.bat`
- **Erreurs CORS:** Vérifiez la configuration dans `ai-service/app/main.py`
- **Dépendances:** Exécutez `npm install` et `pip install -r requirements.txt`

### Scripts Utiles
- `start-smart.bat` - Démarrage intelligent avec détection de ports
- `check-ports.bat` - Vérification des ports disponibles
- `test-services.html` - Page de test des services

📖 **Guide complet:** Voir [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
# MarketHub
