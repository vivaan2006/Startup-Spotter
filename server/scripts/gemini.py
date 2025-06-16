import google.generativeai as genai
from server.scripts.model.embedder import Embedder
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

class GeminiEmbedder(Embedder):
    def __init__(self):
        self.model = genai.GenerativeModel("embedding-001")

    def embed(self, text: str) -> list[float]:
        res = self.model.embed_content(content=text, task_type="RETRIEVAL_DOCUMENT")
        return res["embedding"]
