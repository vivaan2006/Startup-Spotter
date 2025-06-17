from fastapi import FastAPI
from pydantic import BaseModel
from state import session_service_stateful, runner, USER_ID
from initial_setup import handle_user_start
from query import handle_user_prompt
import asyncio

app = FastAPI()

# Define request models
class StartSessionRequest(BaseModel):
    user_id: str

class PromptRequest(BaseModel):
    session_id: str
    user_input: str

# Create session endpoint
@app.post("/start_session")
async def start_session(request: StartSessionRequest):
    session_id = await handle_user_start(request.user_id)
    return {"session_id": session_id}

# Handle user input endpoint
@app.post("/run_agent")
async def run_agent(request: PromptRequest):
    response = await handle_user_prompt(request.session_id, request.user_input)
    # If your handle_user_prompt returns a set, extract the string
    response_text = list(response)[0] if isinstance(response, set) else response
    return {"response": response_text}

# Optional health check
@app.get("/")
def root():
    return {"message": "Agent server is running"}