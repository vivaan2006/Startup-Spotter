# server/api/vector_search_api.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from server.scripts.geminiembedding.embedding import GeminiEmbedder
from server.scripts.mdbmodel.mdb import collection

router = APIRouter()
embedder = GeminiEmbedder()

class QueryRequest(BaseModel):
    query: str

@router.post("/vector-search")
async def vector_search(req: QueryRequest):
    try:
        query_vector = embedder.embed(req.query)

        pipeline = [
            {
                "$vectorSearch": {
                    "index": "embedding_vector_index",
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": 100,
                    "limit": 5
                }
            },
            {
                "$project": {
                    "county": 1,
                    "state": 1,
                    "poverty_rate": 1,
                    "score": { "$meta": "vectorSearchScore" }
                }
            }
        ]

        results = list(collection.aggregate(pipeline))
        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
