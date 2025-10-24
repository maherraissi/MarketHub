# 🔧 Guide de Dépannage - MarketHub

## 🚨 Problèmes Courants

### 1. Erreur de Port Occupé

**Symptôme:** `[WinError 10013] Une tentative d'accès à un socket de manière interdite`

**Solutions:**
```cmd
# Vérifier les ports utilisés
check-ports.bat

# Utiliser un port alternatif
start-ai-service-alt.bat

# Ou utiliser le démarrage intelligent
start-smart.bat
```

### 2. Erreur de Compilation Angular

**Symptôme:** `Can't bind to 'routerLinkActiveOptions'`

**Solution:** ✅ **Corrigé** - Import de `RouterLinkActive` ajouté

### 3. CORS Errors

**Symptôme:** `Access to fetch at 'http://localhost:8086' from origin 'http://localhost:4200' has been blocked by CORS policy`

**Solution:** ✅ **Corrigé** - CORS configuré pour localhost et 127.0.0.1

### 4. Service Non Accessible

**Vérifications:**
1. Le service est-il démarré ?
2. Le port est-il correct ?
3. Y a-t-il des erreurs dans la console ?

**Tests:**
```cmd
# Tester l'AI Service
curl http://localhost:8086/ai/health

# Tester le Catalog Service
curl http://localhost:8081/api/catalog/health
```

### 5. Dépendances Manquantes

**Angular:**
```cmd
cd frontend/webapp-ng
npm install
```

**Python:**
```cmd
cd ai-service
pip install -r requirements.txt
```

## 🛠️ Solutions par Service

### Frontend Angular
- **Port:** 4200
- **URL:** http://localhost:4200
- **Build:** `npm run build`
- **Serve:** `npm start`

### AI Service (FastAPI)
- **Port:** 8086 (ou 8087 si occupé)
- **Health:** http://localhost:8086/ai/health
- **Swagger:** http://localhost:8086/docs
- **Démarrage:** `uvicorn app.main:app --reload --port 8086`

### Catalog Service (Spring Boot)
- **Port:** 8081
- **Health:** http://localhost:8081/api/catalog/health
- **Swagger:** http://localhost:8081/swagger-ui/index.html

## 🔍 Diagnostic

### Scripts de Diagnostic
```cmd
# Vérifier les ports
check-ports.bat

# Tester les services
# Ouvrir test-services.html dans le navigateur

# Démarrage intelligent
start-smart.bat
```

### Logs à Vérifier
1. **Console Angular:** F12 → Console
2. **Terminal AI Service:** Erreurs Python/FastAPI
3. **Terminal Frontend:** Erreurs npm/Angular

## 🚀 Démarrage Recommandé

### Option 1: Script Intelligent
```cmd
start-smart.bat
```

### Option 2: Manuel avec Vérification
```cmd
# 1. Vérifier les ports
check-ports.bat

# 2. Démarrer AI Service
start-ai-service.bat

# 3. Démarrer Frontend
start-frontend.bat
```

### Option 3: Docker Compose (Recommandé pour production)
```cmd
cd infra/docker
docker compose up -d --build
```

## 📞 Support

Si les problèmes persistent:
1. Vérifiez les logs d'erreur
2. Testez avec `test-services.html`
3. Utilisez Docker Compose pour un environnement isolé
4. Consultez le README.md pour les instructions complètes
