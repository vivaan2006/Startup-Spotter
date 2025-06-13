from initial_setup import handle_user_start
from query import handle_user_prompt
import asyncio
from state import USER_ID, SESSION_ID, state, session_service_stateful, APP_NAME

from dotenv import load_dotenv
load_dotenv()

async def main():
    # Simulate user starting the application
    session_id = await handle_user_start(USER_ID)
    print(f"Session started with ID: {session_id}")

    # Simulate user input
    while True:
        user_input = input("Enter your startup idea or type 'exit' to quit: ")
        if user_input.lower() == 'exit':
            print("Exiting the application.")
            break
        else:
            # Handle the user input
            response = await handle_user_prompt(SESSION_ID, user_input)
            print(f"Response: {response}")
    session = await session_service_stateful.get_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID
    )
    print("Application has finished running.")
    
    print(f"Current State: {session.state}") # type: ignore
if __name__ == "__main__":
    asyncio.run(main())
    
    