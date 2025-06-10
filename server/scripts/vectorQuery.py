import os
import sys

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from mdbmodel.mdb import collection
from geminiembedding.embedding import GeminiEmbedder


embedder = GeminiEmbedder()

def vector_search(query_text: str):
    query_vector = embedder.embed(query_text)

    pipeline = [
        {
            "$vectorSearch": {
                "index": "embedding_vector_index",  # Make sure this matches your Atlas index name
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
                "score": { "$meta": "vectorSearchScore" }
            }
        }
    ]

    results = list(collection.aggregate(pipeline))
    print(f"\n🔍 Top matches for: '{query_text}'\n")
    for doc in results:
        print(f"{doc['county']}, {doc['state']} (score: {doc['score']:.4f})")

if __name__ == "__main__":
    vector_search("rural counties with high poverty")
