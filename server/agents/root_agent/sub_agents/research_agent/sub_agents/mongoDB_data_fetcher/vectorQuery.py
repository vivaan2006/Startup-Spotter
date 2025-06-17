import os
from pymongo import MongoClient
from .geminiembedding.embedding import GeminiEmbedder
from google.adk.tools.tool_context import ToolContext

def vector_search(query_text: str, tool_context: ToolContext) -> dict:
    """
    Perform a vector search on a MongoDB collection of demographics data.
    Args:
        query_text (str): The text query to search for.
    Returns:
        dict: A dictionary containing the search results or an error message.
    """
    print(f"\n🔍 Top matches for: '{query_text}'\n")
    top_k: int = 5
    # 🧠 Embedder setup
    embedder = GeminiEmbedder()

    # 🌍 MongoDB setup (from env)
    client = MongoClient(os.environ["MONGO_URI"])
    db = client["startup_spotter"]
    collection = db["demographics"]

    # Skip summarization
    tool_context.actions.skip_summarization = True

    # Step 1: Convert query to embedding
    try:
        query_vector = embedder.embed(query_text)
    except Exception as e:
        print(f"❌ Embedding failed: {e}")
        return {
            "status": "error",
            "message": "Embedding failed. Please check your input or API key."
        }

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

        formatted_results = []

        for i, result in enumerate(results):
                entry = {
                    "rank": i + 1,
                    "county": result['county'],
                    "state": result['state'],
                    "score": round(result.get("score", 0), 4),
                    "details": {
                        "Population": result.get("population"),
                        "Median Income": result.get("median_income"),
                        "Unemployment": result.get("unemployment_rate"),
                        "Poverty": result.get("poverty_rate")
                    }
                }
                formatted_results.append(entry)
        if not formatted_results:
            print("No results found.")
            return {
                "status": "no_results",
                "message": "No matching documents found."
            }
        
        return {
            "status": "success",
            "results": formatted_results
        }

    except Exception as e:
        print(f"❌ Query failed: {e}")
        return {
            "status": "error",
            "message": "Query failed. Please check your MongoDB connection or query syntax."
        }

# Run this script directly
# if __name__ == "__main__":
#     print(vector_search("demographics of Queens, NY"))
    