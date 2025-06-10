import uuid

SESSION_ID = str(uuid.uuid4())

# To be changed to GET requests later
APP_NAME = "StartupSpotter"
USER_ID = "Kyle_Law"


state = {
    "user_id": USER_ID,
    "budget": None,
    "location": None,
    "idea": None,
    "interests": [],
    "steps": None
}
