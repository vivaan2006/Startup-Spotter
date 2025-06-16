# server/main.py

from fastapi import FastAPI
from server.api.vector_search_api import router as vector_search_router

app = FastAPI()
app.include_router(vector_search_router, prefix="/api")
