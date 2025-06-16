from dotenv import load_dotenv
from google.genai import types
import asyncio
from state import APP_NAME, USER_ID, SESSION_ID, runner

load_dotenv()

async def handle_user_prompt(session_id, prompt):
    new_message = types.Content(
        role="user", parts=[types.Part(text=prompt)]
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
                return {event.content.parts[0].text}
