import uuid

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
