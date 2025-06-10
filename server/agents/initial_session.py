
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService # will eventually need to either use database or vertexai to store sessions in memory
from google.genai import types
from root_agent import root_agent
import asyncio
from state import APP_NAME, USER_ID, SESSION_ID, state


load_dotenv()
session_service_stateful = InMemorySessionService()


async def main():
    stateful_sesion = await session_service_stateful.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID,
        state=state
    )
    print("Created New Session:")
    print(f"\tSession ID: {SESSION_ID}")

    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service_stateful
    )


    new_message = types.Content(
        role="user", parts=[types.Part(text="I have a budget of $15,000 and I want to start a business in Queens, NYC. I am interested in finance, coding, and teaching.")]
    )

    for event in runner.run(
        user_id=USER_ID,
        session_id=SESSION_ID,
        new_message=new_message,
    ):
        calls = event.get_function_calls()
        if calls:
            for call in calls:
                tool_name = call.name
                arguments = call.args # This is usually a dictionary
                print(f"  Tool: {tool_name}, Args: {arguments}")
                # Application might dispatch execution based on this
        if event.actions and event.actions.state_delta:
            print(f"  State changes: {event.actions.state_delta}")
            # Update local UI or application state if necessary
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