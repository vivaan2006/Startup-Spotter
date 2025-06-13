import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

class GeminiEmbedder:
    def embed(self, text: str) -> list[float]:
        try:
            res = genai.embed_content(
                model="models/embedding-001",
                content=text,
                task_type="RETRIEVAL_QUERY"  # ✅ Match index dimension (768)
                # No title needed for query
            )
            return res["embedding"]
        except Exception as e:
            raise RuntimeError(f"Gemini embedding failed: {e}")
