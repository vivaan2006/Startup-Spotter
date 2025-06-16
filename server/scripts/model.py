def generate_gemini_embedding(text):
    model = genai.GenerativeModel('embedding-001')
    res = model.embed_content(
        content=text,
        task_type="RETRIEVAL_DOCUMENT"  # or "RETRIEVAL_QUERY" if user query
    )
    return res['embedding']

def format_doc(doc):
    return (
        f"{doc['county']}, {doc['state']} — Population: {doc['population']}, "
        f"Median Income: {doc['median_income']}, Unemployment Rate: {doc['unemployment_rate']}%, "
        f"Child Poverty Rate: {doc['child_poverty_rate']}%"
    )

for doc in collection.find({ "embedding": { "$exists": False } }):
    text = format_doc(doc)
    vector = generate_gemini_embedding(text)
    collection.update_one({ "_id": doc["_id"] }, { "$set": { "embedding": vector } })


query_text = "Low income counties with high child poverty"
query_vector = generate_gemini_embedding(query_text)

pipeline = [
    {
        "$vectorSearch": {
            "index": "default",  # your vector search index name
            "path": "embedding",
            "queryVector": query_vector,
            "numCandidates": 100,
            "limit": 5
        }
    }
]

results = list(collection.aggregate(pipeline))
