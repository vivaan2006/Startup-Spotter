import uuid
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService # will eventually need to either use database or vertexai to store sessions in memory
from google.genai import types
from root_agent import root_agent
import asyncio

load_dotenv()

session_service_stateful = InMemorySessionService()

initial_state = {
    "user_id":"Kyle",
    "startup_idea": None
}

APP_NAME = "Kyle Bot"
USER_ID = "Kyle_Law"
SESSION_ID = str(uuid.uuid4())

async def main():

    stateful_sesion = await session_service_stateful.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID,
        state=initial_state
    )
    print("Created New Session:")
    print(f"\tSession ID: {SESSION_ID}")

    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service_stateful
    )

    new_message = types.Content(
        role="user", parts=[types.Part(text="Get my current startup idea.")]
    )

    for event in runner.run(
        user_id=USER_ID,
        session_id=SESSION_ID,
        new_message=new_message,
    ):
        if event.is_final_response():
            if event.content and event.content.parts:
                print(f"Final Response: {event.content.parts[0].text}")
    print("SESSION EVENT EXPLORATION")

    session = await session_service_stateful.get_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )

    print("=== Final Session State ===")
    for key, value in session.state.items(): # type: ignore
        print(f"{key}: {value}")

asyncio.run(main())