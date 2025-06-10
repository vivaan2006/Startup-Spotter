# server/scripts/gemini/embedding.py


import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# server/scripts/geminiembedding/embedding.py


class GeminiEmbedder:
    def embed(self, text: str) -> list[float]:
        res = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="RETRIEVAL_DOCUMENT"
        )
        return res["embedding"]