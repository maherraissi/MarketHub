from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MarketHub AI Service", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/ai/health")
def health():
    return {"status": "UP"}


class SearchRequest(BaseModel):
    query: str
    filters: Optional[dict] = None
    topK: int = 10


class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    score: float


@app.post("/ai/search")
def search(req: SearchRequest) -> List[Product]:
    # Réponse simulée pour démarrage rapide
    results = [
        Product(id="SKU-1", name="Perceuse X100", description="Perceuse sans fil 18V", price=129.9, score=0.92),
        Product(id="SKU-2", name="Vis inox M4", description="Vis inoxydables M4 x 20", price=5.5, score=0.84),
    ]
    return results[: req.topK]
