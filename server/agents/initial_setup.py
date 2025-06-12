# first-time boot handler
from state import APP_NAME, USER_ID, SESSION_ID, state, session_service_stateful

async def handle_user_start(user_id):
    stateful_sesion = await session_service_stateful.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID,
        state=state
    )
    print("Created New Session:")
    print(f"\tSession ID: {SESSION_ID}")

    return SESSION_ID