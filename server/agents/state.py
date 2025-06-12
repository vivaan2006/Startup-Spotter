import uuid
from google.adk.sessions import InMemorySessionService # will eventually need to either use database or vertexai to store sessions in memory
from google.adk.runners import Runner
from root_agent import root_agent

SESSION_ID = str(uuid.uuid4())

# To be changed to GET requests from memory later
APP_NAME = "StartupSpotter"
USER_ID = "Kyle_Law"


state = {
    "user_id": USER_ID,
    "budget": None,
    "location": None,
    "idea": ["Idea", "Idea Description"],
    "interests": [],
    "steps": ["Step Number", "Step name", "Step Description"],
    "data": None
}

session_service_stateful = InMemorySessionService()
runner = Runner(
    agent=root_agent,
    app_name=APP_NAME,
    session_service=session_service_stateful
)
