# scripts/vectorSearch.py

import os
import sys

# Add project root (Startup-Spotter/) to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from geminiembedding.embedding import GeminiEmbedder
from mdbmodel.mdb import collection


embedder = GeminiEmbedder()

def format_doc(doc):
    return (
        f"{doc['county']}, {doc['state']} — Population: {doc['population']}, "
        f"Median Income: {doc['median_income']}, Unemployment Rate: {doc['unemployment_rate']}%, "
        f"Child Poverty Rate: {doc['child_poverty_rate']}%"
    )

def populate_embeddings():
    for doc in collection.find({ "embedding": { "$exists": False } }):
        try:
            text = format_doc(doc)
            embedding = embedder.embed(text)
            collection.update_one({ "_id": doc["_id"] }, { "$set": { "embedding": embedding } })
            print(f"✅ Updated: {doc['county']}")
        except Exception as e:
            print(f"❌ Failed on {doc.get('county', 'unknown')}: {e}")

if __name__ == "__main__":
    populate_embeddings()
