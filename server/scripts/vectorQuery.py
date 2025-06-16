import os
from pymongo import MongoClient
from geminiembedding.embedding import GeminiEmbedder
from pprint import pprint

# 🧠 Embedder setup
embedder = GeminiEmbedder()

# 🌍 MongoDB setup (from env)
client = MongoClient(os.environ["MONGO_URI"])
db = client["startup_spotter"]
collection = db["demographics"]

def vector_search(query_text: str, top_k: int = 5):
    print(f"\n🔍 Top matches for: '{query_text}'\n")

    # Step 1: Convert query to embedding
    try:
        query_vector = embedder.embed(query_text)
    except Exception as e:
        print(f"❌ Embedding failed: {e}")
        return

    # Step 2: Perform vector search
    try:
        results = collection.aggregate([
            {
                "$vectorSearch": {
                    "index": "embedding_vector_index",  # <-- Your index name
                    "path": "embedding",                # <-- Your vector field
                    "queryVector": query_vector,
                    "numCandidates": 100,
                    "limit": top_k,
                    "similarity": "cosine"
                }
            }
        ])

        for i, result in enumerate(results):
            print(f"{i+1}. {result['county']}, {result['state']} (Score: {result.get('score', 0):.4f})")
            pprint({
                "Population": result.get("population"),
                "Median Income": result.get("median_income"),
                "Unemployment": result.get("unemployment_rate"),
                "Poverty": result.get("poverty_rate")
            })
            print()

    except Exception as e:
        print(f"❌ Query failed: {e}")

# Run this script directly
if __name__ == "__main__":
    vector_search("rural counties with high poverty and low income")
    